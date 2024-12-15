'use client';
import { motion } from 'motion/react';
import { FC, PropsWithChildren } from 'react';
import { Button, ButtonProps } from 'react-aria-components';
import { defaultTransition } from './defaultTransition';

export const PressableButton: FC<PropsWithChildren & ButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <motion.span
      whileTap={{
        scale: 0.97,
        transition: { ...defaultTransition, visualDuration: 0.15 },
      }}
    >
      <Button {...rest}>{children}</Button>
    </motion.span>
  );
};
