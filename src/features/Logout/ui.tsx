'use client';
import { UserContext } from '@/app/ui';
import { auth } from '@/shared/config/firebase';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
} from '@nextui-org/react';
import { FirebaseError } from 'firebase/app';
import { FC, useContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import { scaleFadeModal } from '@/shared/ui';

interface LogoutProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Logout: FC<LogoutProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      await signOut(auth);
    } catch (error) {
      const firebaseError = error as FirebaseError;

      if (firebaseError.code) {
        setError(firebaseError.code);
      }
    } finally {
      setIsLoading(false);

      handleClose();
    }
  };

  const handleClose = () => {
    setError(undefined);
    setIsOpen(false);
  };

  return (
    <Modal
      placement='center'
      backdrop='blur'
      isOpen={isOpen}
      onClose={handleClose}
      motionProps={scaleFadeModal}
    >
      <ModalContent>
        <ModalHeader>Logout</ModalHeader>
        <ModalBody>
          Are you sure?
          {error && (
            <p role='alert' className='text-danger'>
              {error}
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={handleClose}>
            Cancel
          </Button>
          <Button
            color='primary'
            isLoading={isLoading}
            isDisabled={!user}
            onPress={handleLogout}
          >
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
