'use client';
import { UserContext } from '@/app/ui';
import { reauthenticateUser } from '@/shared/api';
import { scaleFadeModal, ToggleVisibilityButton } from '@/shared/ui';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { Button, Input } from '@nextui-org/react';
import { verifyBeforeUpdateEmail } from 'firebase/auth';
import { FC, useContext, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import { AnimatePresence, motion } from 'framer-motion';
import { Success } from './Success';

interface ChangeEmailProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface Inputs {
  password: string;
  newEmail: string;
}

export const ChangeEmail: FC<ChangeEmailProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useContext(UserContext);

  const { control, formState, handleSubmit, setError, reset } = useForm<Inputs>(
    {
      defaultValues: { password: '', newEmail: '' },
      shouldUnregister: true,
    }
  );

  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ password, newEmail }) => {
    try {
      if (user && user.email) {
        await reauthenticateUser(user, user.email, password);
        await verifyBeforeUpdateEmail(user, newEmail);
      } else {
        setError('root', { message: 'User email is null' });
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
                <ModalHeader>Email address</ModalHeader>
                <ModalBody>
                  <Controller
                    control={control}
                    name='password'
                    rules={{ required: 'Password is required', minLength: 1 }}
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
                  <Controller
                    control={control}
                    name='newEmail'
                    rules={{
                      required: 'New email is required',
                      minLength: 1,
                    }}
                    render={({ field }) => (
                      <Input
                        isRequired
                        type='email'
                        label='New email'
                        errorMessage={errors.newEmail?.message}
                        isInvalid={errors.newEmail?.message !== undefined}
                        isDisabled={!user}
                        {...field}
                      />
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
                    Save
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
