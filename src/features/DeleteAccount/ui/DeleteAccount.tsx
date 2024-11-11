'use client';
import { UserContext } from '@/app/ui';
import { reauthenticateUser } from '@/shared/api';
import { scaleFadeModal, ToggleVisibilityButton } from '@/shared/ui';
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { deleteUser } from 'firebase/auth';
import { FC, useContext, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import { AnimatePresence, motion } from 'framer-motion';
import { deleteObject, listAll, ref } from 'firebase/storage';
import { db, storage } from '@/shared/config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { Success } from './Success';

interface DeleteAccountProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface Inputs {
  password: string;
  email: string;
  confirm: boolean;
}

export const DeleteAccount: FC<DeleteAccountProps> = ({
  // TODO: refactor component
  isOpen,
  setIsOpen,
}) => {
  const { user } = useContext(UserContext);

  const { control, formState, handleSubmit, setError, reset } = useForm<Inputs>(
    {
      defaultValues: { password: '', email: '', confirm: false },
      shouldUnregister: true,
    }
  );

  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ password, email }) => {
    try {
      if (user) {
        await reauthenticateUser(user, email, password);

        // delete user firebase storage (pets images)
        const petsStorageRef = ref(storage, `users/${user.uid}/pets`);
        const petsStorageList = await listAll(petsStorageRef);
        for (const itemRef of petsStorageList.items) {
          await deleteObject(itemRef);
        }

        // delete user from db
        await deleteDoc(doc(db, 'users', user.uid));

        // delete user from auth
        await deleteUser(user);
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;

      if (firebaseError.code) {
        setError('root', { message: firebaseError.code });
      } else {
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPasswordVisible(false);
    reset();
  };

  const isGoogleProvider = user?.providerData[0].providerId === 'google.com';

  return (
    <Modal
      hideCloseButton={isSubmitSuccessful}
      placement='center'
      backdrop='blur'
      isOpen={isOpen}
      onClose={handleClose}
      motionProps={scaleFadeModal}
    >
      <ModalContent>
        <form
          onSubmit={!isSubmitSuccessful ? handleSubmit(onSubmit) : undefined}
        >
          <AnimatePresence>
            {!isSubmitSuccessful ? (
              <motion.div key={'default'}>
                <ModalHeader>Delete account</ModalHeader>
                <ModalBody>
                  {!isGoogleProvider && (
                    <>
                      <Controller
                        control={control}
                        name='email'
                        rules={{
                          required: 'Email is required',
                          minLength: 1,
                        }}
                        render={({ field }) => (
                          <Input
                            isRequired
                            type='email'
                            label='Email'
                            errorMessage={errors.email?.message}
                            isInvalid={errors.email?.message !== undefined}
                            isDisabled={!user}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name='password'
                        rules={{
                          required: 'Password is required',
                          minLength: 1,
                        }}
                        render={({ field }) => (
                          <Input
                            isRequired
                            type={isPasswordVisible ? 'text' : 'password'}
                            label='Password'
                            errorMessage={errors.password?.message}
                            isInvalid={errors.password?.message !== undefined}
                            isDisabled={!user}
                            endContent={
                              <ToggleVisibilityButton
                                isVisible={isPasswordVisible}
                                setIsVisible={setIsPasswordVisible}
                              />
                            }
                            {...field}
                          />
                        )}
                      />
                    </>
                  )}
                  <Controller
                    control={control}
                    name='confirm'
                    rules={{
                      required: 'Confirmation is required',
                      validate: (value) => value,
                    }}
                    render={({
                      field: { onChange, value, onBlur, ref, name },
                    }) => (
                      <Checkbox
                        isRequired
                        isInvalid={errors.confirm?.message !== undefined}
                        isDisabled={!user}
                        checked={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        name={name}
                      >
                        I understand that deleted account isn&apos;t recoverable
                      </Checkbox>
                    )}
                  />
                  {errors.root && (
                    <p role='alert' className='text-danger'>
                      {errors.root?.message}
                    </p>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='light' onPress={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    color='primary'
                    type='submit'
                    isLoading={isSubmitting}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </motion.div>
            ) : (
              <Success onClose={handleClose} />
            )}
          </AnimatePresence>
        </form>
      </ModalContent>
    </Modal>
  );
};
