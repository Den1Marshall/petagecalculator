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
import { auth } from '@/shared/config/firebase';
import { FirebaseError } from 'firebase/app';
import { LoginForgotPassword } from './LoginForgotPassword';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { addNewUserToDatabase } from '../api';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Login: FC<LoginProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<'signIn' | 'signUp'>('signIn');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [forgotPassword, setForgotPassword] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

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

      setErr(firebaseError.code);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithPopup = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const userCredential = await signInWithPopup(auth, provider);

      await addNewUserToDatabase(userCredential.user.uid);
    } catch (error) {
      const firebaseError = error as FirebaseError;

      setErr(firebaseError.code);
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
      shouldBlockScroll={false}
      isOpen={isOpen}
      onClose={onClose}
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
      <ModalContent className='relative min-h-[428px]'>
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
                      setErr('');
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    color={type !== 'signIn' ? 'primary' : 'default'}
                    onPress={() => {
                      setType('signUp');
                      setErr('');
                    }}
                  >
                    Sign Up
                  </Button>
                </ButtonGroup>
                <Button onPress={handleSignInWithPopup}>
                  Continue With Google
                </Button>
                <p className='text-center'>OR</p>
                <Input
                  isRequired
                  type='email'
                  value={email}
                  onValueChange={setEmail}
                  placeholder='Email'
                  errorMessage={err}
                  isInvalid={Boolean(err)}
                />
                <Input
                  isRequired
                  type='password'
                  value={password}
                  onValueChange={setPassword}
                  placeholder='Password'
                />
              </ModalBody>
              <ModalFooter className='flex flex-col'>
                <Button
                  isLoading={isLoading}
                  fullWidth
                  color='primary'
                  onPress={handleLogin}
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
