'use client';
import {
  Button,
  ButtonGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { FC, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/shared/config';
import { FirebaseError } from 'firebase/app';
import { LoginForgotPassword } from './LoginForgotPassword';
import { AnimatePresence, Variants, motion } from 'motion/react';
import { addNewUserToDatabase } from '../api';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ToggleVisibilityButton } from '@/shared/ui';
import { GoogleIcon } from './GoogleIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '../model/zodSchema';
import { useScaleModalMotionProps } from '@/shared/lib';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  password: string;
}

export const Login: FC<LoginProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<'signIn' | 'signUp'>('signIn');

  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
    clearErrors,
    setValue,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(type === 'signIn' ? loginSchema : registerSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleSignInWithPopup = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const userCredential = await signInWithPopup(auth, provider);

      await addNewUserToDatabase(userCredential.user.uid);
    } catch (error) {
      error instanceof FirebaseError
        ? setError('root', { type: 'custom', message: error.code })
        : setError('root', {
            type: 'custom',
            message: 'Something has went wrong',
          });
    }
  };

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    try {
      if (type === 'signIn') {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        await addNewUserToDatabase(userCredential.user.uid);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await addNewUserToDatabase(userCredential.user.uid);
      }
    } catch (error) {
      error instanceof FirebaseError
        ? setError('root', { type: 'custom', message: error.code })
        : setError('root', {
            type: 'custom',
            message: 'Something has went wrong',
          });
    }
  };

  const variants: Variants = {
    enter: {
      transform: 'translateX(0%)',
    },
    exit: {
      transform: 'translateX(-100%)',
    },
  };

  const scaleModalMotionProps = useScaleModalMotionProps();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      backdrop='blur'
      placement='center'
      motionProps={scaleModalMotionProps}
    >
      <ModalContent className='relative min-h-[428px]'>
        <AnimatePresence initial={false}>
          {forgotPassword ? (
            <LoginForgotPassword
              key={'forgotPassword'}
              setIsOpen={setForgotPassword}
            />
          ) : (
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              key='login'
              variants={variants}
              initial='exit'
              animate='enter'
              exit='exit'
            >
              <ModalHeader>Log In to continue</ModalHeader>
              <ModalBody>
                <Button onPress={handleSignInWithPopup}>
                  Continue With Google <GoogleIcon />
                </Button>

                <p className='text-center'>OR</p>

                <ButtonGroup fullWidth>
                  <Button
                    color={type === 'signIn' ? 'primary' : 'default'}
                    onPress={() => {
                      setType('signIn');
                      clearErrors();
                    }}
                  >
                    Sign In
                  </Button>

                  <Button
                    color={type !== 'signIn' ? 'primary' : 'default'}
                    onPress={() => {
                      setType('signUp');
                      clearErrors();
                    }}
                  >
                    Sign Up
                  </Button>
                </ButtonGroup>

                <Controller
                  control={control}
                  name='email'
                  render={({ field }) => (
                    <Input
                      isRequired
                      type='email'
                      placeholder='Email'
                      isClearable
                      onClear={() => setValue('email', '')}
                      isInvalid={errors.email?.message !== undefined}
                      errorMessage={errors.email?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name='password'
                  render={({ field }) => (
                    <Input
                      isRequired
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder='Password'
                      isInvalid={errors.password?.message !== undefined}
                      errorMessage={errors.password?.message}
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

                {errors.root && (
                  <p role='alert' className='text-danger self-start'>
                    Error: {errors.root?.message}
                  </p>
                )}
              </ModalBody>

              <ModalFooter className='flex flex-col'>
                <Button
                  type='submit'
                  isLoading={isSubmitting}
                  fullWidth
                  color='primary'
                >
                  {type === 'signIn' ? 'Sign In' : 'Sign Up'}
                </Button>

                <Button
                  variant='light'
                  fullWidth
                  color='danger'
                  onPress={() => {
                    setType('signIn');
                    setForgotPassword(true);
                    setIsPasswordVisible(false);
                  }}
                >
                  Forgot password?
                </Button>
              </ModalFooter>
            </motion.form>
          )}
        </AnimatePresence>
      </ModalContent>
    </Modal>
  );
};
