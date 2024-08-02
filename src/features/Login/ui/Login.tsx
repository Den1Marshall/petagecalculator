'use client';
import { Button, ButtonGroup, Input } from '@nextui-org/react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { FC, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/shared/config/firebase';
import { FirebaseError } from 'firebase/app';
import { LoginForgotPassword } from './LoginForgotPassword';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { addNewUserToDatabase } from '../api';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon, GoogleIcon } from '@/shared/ui';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Inputs {
  email: string;
  password: string;
}

export const Login: FC<LoginProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<'signIn' | 'signUp'>('signIn');

  const { control, formState, handleSubmit, clearErrors, setValue, setError } =
    useForm<Inputs>();
  const { isSubmitting, errors } = formState;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleSignInWithPopup = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const userCredential = await signInWithPopup(auth, provider);

      await addNewUserToDatabase(userCredential.user.uid);
    } catch (error) {
      const firebaseError = error as FirebaseError;

      setError('email', { type: 'custom', message: firebaseError.code });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
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
      const firebaseError = error as FirebaseError;

      setError('email', { type: 'custom', message: firebaseError.code });
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      backdrop='blur'
      placement='center'
      motionProps={{
        variants: {
          enter: {
            transform: 'translateY(0%)',
            opacity: 1,
          },
          exit: {
            transform: 'translateY(10%)',
            opacity: 0,
          },
        },
      }}
      className='origin-bottom'
    >
      <ModalContent
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
        className='relative min-h-[428px]'
      >
        <AnimatePresence initial={false}>
          {forgotPassword ? (
            <LoginForgotPassword
              key={'forgotPassword'}
              setIsOpen={setForgotPassword}
            />
          ) : (
            <motion.div
              key={'login'}
              variants={variants}
              initial={'exit'}
              animate={'enter'}
              exit='exit'
            >
              <ModalHeader>Log In to continue</ModalHeader>
              <ModalBody>
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
                <Button onPress={handleSignInWithPopup}>
                  Continue With Google <GoogleIcon />
                </Button>
                <p className='text-center'>OR</p>
                <Controller
                  name='email'
                  rules={{ required: 'This field is required' }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      isRequired
                      type='email'
                      placeholder='Email'
                      isClearable
                      onClear={() => setValue('email', '')}
                      errorMessage={errors.email?.message}
                      isInvalid={Boolean(errors.email?.message)}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name='password'
                  rules={{ required: 'This field is required' }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      isRequired
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder='Password'
                      endContent={
                        <button
                          className='focus:outline-none'
                          type='button'
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                          aria-label='toggle password visibility'
                        >
                          {isPasswordVisible ? (
                            <EyeIcon className='text-2xl text-default-400 pointer-events-none' />
                          ) : (
                            <EyeSlashIcon className='text-2xl text-default-400 pointer-events-none' />
                          )}
                        </button>
                      }
                      {...field}
                    />
                  )}
                />
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
                  onPress={() => setForgotPassword(true)}
                >
                  Forgot password?
                </Button>
              </ModalFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalContent>
    </Modal>
  );
};
