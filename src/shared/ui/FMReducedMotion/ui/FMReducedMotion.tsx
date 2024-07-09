'use client';
import { FC, ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

export const FMReducedMotion: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MotionConfig
      reducedMotion='user'
      transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
    >
      {children}
    </MotionConfig>
  );
};
