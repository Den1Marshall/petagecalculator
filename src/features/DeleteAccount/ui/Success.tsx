import { FC } from 'react';
import { motion } from 'motion/react';
import { Button, ModalFooter, ModalHeader } from '@nextui-org/react';

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
      <ModalHeader>Your account has been deleted</ModalHeader>
      <ModalFooter>
        <Button fullWidth color='primary' onPress={onClose}>
          Done
        </Button>
      </ModalFooter>
    </motion.div>
  );
};
