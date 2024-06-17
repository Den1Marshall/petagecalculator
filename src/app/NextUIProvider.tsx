'use client';
import { NextUIProvider as Provider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface NextUIProviderProps {
  children: ReactNode;
  className?: string;
}

export const NextUIProvider: FC<NextUIProviderProps> = ({
  children,
  className,
}) => {
  const router = useRouter();

  return (
    <Provider navigate={router.push} className={className}>
      {children}
    </Provider>
  );
};
