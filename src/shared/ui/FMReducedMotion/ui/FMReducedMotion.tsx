'use client';
import { FC, ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

export const FMReducedMotion: FC<{ children: ReactNode }> = ({ children }) => {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
};
