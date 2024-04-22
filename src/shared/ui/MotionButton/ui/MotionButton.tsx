'use client';
import { MotionProps, motion } from 'framer-motion';
import { FC } from 'react';
import { Button as AriaButton, ButtonProps } from 'react-aria-components';

const Button = motion(AriaButton);

export const MotionButton: FC<ButtonProps & MotionProps> = ({
  children,
  ...rest
}) => {
  return <Button {...rest}>{children}</Button>;
};
