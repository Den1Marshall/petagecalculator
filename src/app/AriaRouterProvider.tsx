'use client';
import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { RouterProvider } from 'react-aria-components';

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

interface AriaRouterProviderProps {
  children: ReactNode;
}

export const AriaRouterProvider: FC<AriaRouterProviderProps> = ({
  children,
}) => {
  const router = useRouter();

  return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
};
