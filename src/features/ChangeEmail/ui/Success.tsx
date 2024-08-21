import { FC } from 'react';
import { motion } from 'framer-motion';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/react';

interface SuccessProps {
  onClose: () => void;
}

export const Success: FC<SuccessProps> = ({ onClose }) => {
  return (
    <motion.div
      key={'success'}
      initial={{ transform: 'translateX(100%)' }}
      animate={{ transform: 'translateX(0%)' }}
      exit={{ transform: 'translateX(0%)' }}
    >
      <ModalHeader>Check your email</ModalHeader>
      <ModalBody>
        <p>A verification email has been sent to your new email address.</p>
        <p>Please verify it to login with the new email.</p>
      </ModalBody>
      <ModalFooter>
        <Button fullWidth color='primary' onPress={onClose}>
          Done
        </Button>
      </ModalFooter>
    </motion.div>
  );
};
