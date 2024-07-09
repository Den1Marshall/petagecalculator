'use client';
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { FC, useState } from 'react';
import { Variants, motion } from 'framer-motion';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/shared/config/firebase';
import { ArrowReturnIcon } from '@/shared/ui/ArrowReturnIcon';
import { FirebaseError } from 'firebase/app';

interface LoginForgotPasswordProps {
  setIsOpen: (value: boolean) => void;
}

enum SentStatus {
  NotSent,
  Error,
  Sent,
}

export const LoginForgotPassword: FC<LoginForgotPasswordProps> = ({
  setIsOpen,
}) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sentStatus, setSentStatus] = useState<SentStatus>(SentStatus.NotSent);

  const handleForgotPassword = async () => {
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);

      setSentStatus(SentStatus.Sent);
      setErrorMessage('');
    } catch (error) {
      const fireabseError = error as FirebaseError;
      setErrorMessage(fireabseError.code);

      setSentStatus(SentStatus.Error);
    } finally {
      setIsLoading(false);
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
    <motion.div
      variants={variants}
      initial='exit'
      animate='enter'
      exit='exit'
      className='absolute top-0 left-0 w-full h-full'
    >
      <ModalHeader className='flex items-center gap-1'>
        <Button isIconOnly variant='light' onPress={() => setIsOpen(false)}>
          <ArrowReturnIcon />
        </Button>
        Reset Password
      </ModalHeader>
      <ModalBody>
        <Input
          isClearable
          placeholder='Enter your email'
          value={email}
          onValueChange={setEmail}
          isInvalid={Boolean(errorMessage)}
          errorMessage={errorMessage}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          type='submit'
          isLoading={isLoading}
          onPress={handleForgotPassword}
          fullWidth
          color={
            sentStatus === SentStatus.Sent
              ? 'success'
              : sentStatus === SentStatus.Error
              ? 'danger'
              : 'primary'
          }
        >
          {sentStatus === SentStatus.Sent ? 'Sent' : 'Send'}
        </Button>
      </ModalFooter>
    </motion.div>
  );
};
