'use client';
import { HeroUIProvider as Provider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

interface HeroUIProviderProps {
  children: ReactNode;
}

export const HeroUIProvider: FC<HeroUIProviderProps> = ({ children }) => {
  const router = useRouter();

  return (
    <Provider disableRipple navigate={router.push} className='w-full h-full'>
      <ThemeProvider attribute='class'>{children}</ThemeProvider>
    </Provider>
  );
};
