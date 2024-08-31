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
import { updatePassword } from 'firebase/auth';
import { FC, useContext, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import { AnimatePresence, motion } from 'framer-motion';
import { Success } from './Success';

interface ChangePasswordProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface Inputs {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export const ChangePassword: FC<ChangePasswordProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { user } = useContext(UserContext);

  const { control, formState, handleSubmit, setError, reset } = useForm<Inputs>(
    {
      defaultValues: {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      },
      shouldUnregister: true,
    }
  );

  const { dirtyFields, errors, isSubmitting, isSubmitSuccessful } = formState;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({
    currentPassword,
    newPassword,
  }) => {
    try {
      if (user && user.email) {
        await reauthenticateUser(user, user.email, currentPassword);
        await updatePassword(user, newPassword);
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
    setIsNewPasswordVisible(false);
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
      <ModalContent
        as={!isSubmitSuccessful ? 'form' : undefined}
        onSubmit={!isSubmitSuccessful ? handleSubmit(onSubmit) : undefined}
      >
        <AnimatePresence>
          {!isSubmitSuccessful ? (
            <motion.div key={'default'}>
              <ModalHeader>Password</ModalHeader>
              <ModalBody>
                <Controller
                  control={control}
                  name='currentPassword'
                  rules={{
                    required: true,
                    minLength: 1,
                  }}
                  render={({ field }) => (
                    <Input
                      isRequired
                      type={isPasswordVisible ? 'text' : 'password'}
                      label='Current password'
                      errorMessage={errors.currentPassword?.message}
                      isInvalid={errors.currentPassword?.message !== undefined}
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
                  name='newPassword'
                  rules={{
                    required: true,
                    minLength: 1,
                  }}
                  render={({ field }) => (
                    <Input
                      isRequired
                      type={isNewPasswordVisible ? 'text' : 'password'}
                      label='New password'
                      errorMessage={errors.newPassword?.message}
                      isInvalid={errors.newPassword?.message !== undefined}
                      isDisabled={!user}
                      endContent={
                        <ToggleVisibilityButton
                          isVisible={isNewPasswordVisible}
                          setIsVisible={setIsNewPasswordVisible}
                        />
                      }
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='newPasswordConfirm'
                  rules={{
                    required: true,
                    minLength: 1,
                    validate: (value, formValues) =>
                      value === formValues.newPassword
                        ? true
                        : 'Passwords must match',
                  }}
                  render={({ field }) => (
                    <Input
                      isRequired
                      type={isNewPasswordVisible ? 'text' : 'password'}
                      label='Confirm new password'
                      errorMessage={errors.newPasswordConfirm?.message}
                      isInvalid={
                        errors.newPasswordConfirm?.message !== undefined
                      }
                      isDisabled={!user}
                      endContent={
                        <ToggleVisibilityButton
                          isVisible={isNewPasswordVisible}
                          setIsVisible={setIsNewPasswordVisible}
                        />
                      }
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
                  isDisabled={
                    !dirtyFields.currentPassword ||
                    !dirtyFields.newPassword ||
                    !dirtyFields.newPasswordConfirm
                  }
                >
                  Save
                </Button>
              </ModalFooter>
            </motion.div>
          ) : (
            <Success onClose={handleClose} />
          )}
        </AnimatePresence>
      </ModalContent>
    </Modal>
  );
};