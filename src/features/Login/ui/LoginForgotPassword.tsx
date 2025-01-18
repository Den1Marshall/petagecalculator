'use client';
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';
import { FC } from 'react';
import { Variants, motion } from 'motion/react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/shared/config';
import { ArrowReturnIcon } from './ArrowReturnIcon';
import { FirebaseError } from 'firebase/app';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginForgotPasswordSchema } from '../model/zodSchema';

interface LoginForgotPasswordProps {
  setIsOpen: (value: boolean) => void;
}

interface FormData {
  email: string;
}

export const LoginForgotPassword: FC<LoginForgotPasswordProps> = ({
  setIsOpen,
}) => {
  const {
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    handleSubmit,
    setValue,
    setError,
  } = useForm<FormData>({ resolver: zodResolver(loginForgotPasswordSchema) });

  const onSubmit: SubmitHandler<FormData> = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError('root', { type: 'custom', message: error.code });
      } else {
        setError('root', {
          type: 'custom',
          message: 'Something went wrong',
        });
      }
    }
  };

  const variants: Variants = {
    enter: {
      transform: 'translateX(0%)',
    },
    exit: {
      transform: 'translateX(100%)',
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      variants={variants}
      initial='exit'
      animate='enter'
      exit='exit'
      className='absolute top-0 left-0 w-full h-full'
    >
      <ModalHeader className='flex items-center gap-1'>
        <Button
          isIconOnly
          aria-label='Go back to login'
          variant='light'
          onPress={() => setIsOpen(false)}
        >
          <ArrowReturnIcon />
        </Button>
        Reset Password
      </ModalHeader>

      <ModalBody>
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <Input
              isRequired
              type='email'
              placeholder='Enter your email'
              isClearable
              onClear={() => setValue('email', '')}
              isInvalid={errors.email?.message !== undefined}
              errorMessage={errors.email?.message}
              {...field}
            />
          )}
        />

        {errors.root && (
          <p role='alert' className='text-danger self-start'>
            Error: {errors.root?.message}
          </p>
        )}
      </ModalBody>

      <ModalFooter>
        <Button
          type='submit'
          isLoading={isSubmitting}
          fullWidth
          color={isSubmitSuccessful ? 'success' : 'primary'}
        >
          {isSubmitSuccessful ? 'Sent' : 'Send'}
        </Button>
      </ModalFooter>
    </motion.form>
  );
};
