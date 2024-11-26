'use client';
import { Transition, motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';
import { Button, ButtonProps } from 'react-aria-components';

const buttonTransition: Transition = {
  type: 'spring',
  duration: 0.3,
  bounce: 0,
  restDelta: 0.0001,
  restSpeed: 0.0001,
};

export const PressableButton: FC<PropsWithChildren & ButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <motion.span
      whileTap={{
        scale: 0.97,
        transition: buttonTransition,
      }}
    >
      <Button {...rest}>{children}</Button>
    </motion.span>
  );
};
