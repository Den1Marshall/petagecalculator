'use client';
import { FC } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';

interface IconProps {
  isOpen: boolean;
}

export const Icon: FC<IconProps> = ({ isOpen }) => {
  const variants: Variants = {
    enter: {
      transform: 'scale(1)',
    },

    exit: {
      transform: 'scale(0)',
    },
  };
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='size-6'
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.path
            key={0}
            variants={variants}
            initial='exit'
            animate='enter'
            exit='exit'
            fillRule='evenodd'
            d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z'
            clipRule='evenodd'
          />
        ) : (
          <motion.path
            key={1}
            variants={variants}
            initial='exit'
            animate='enter'
            exit='exit'
            fillRule='evenodd'
            d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
            clipRule='evenodd'
          />
        )}
      </AnimatePresence>
    </motion.svg>
  );
};