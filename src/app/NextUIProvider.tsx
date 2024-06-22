'use client';
import { NextUIProvider as Provider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface NextUIProviderProps {
  children: ReactNode;
}

export const NextUIProvider: FC<NextUIProviderProps> = ({ children }) => {
  const router = useRouter();

  return (
    <NextThemesProvider attribute='class'>
      <Provider navigate={router.push} className={'w-full h-full'}>
        {children}
      </Provider>
    </NextThemesProvider>
  );
};
