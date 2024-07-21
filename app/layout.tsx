import type { Metadata, Viewport } from 'next';
import '@/app/index.css';
import { FMReducedMotion } from '@/shared/ui/FMReducedMotion';
import { startupImage } from './startupImage';
import { Pacifico } from 'next/font/google';
import { title } from './title';
import { description } from './description';
import { Analytics } from '@vercel/analytics/react';
import { AriaRouterProvider } from '@/app/AriaRouterProvider';
import { NextUIProvider } from '@/app/NextUIProvider';
import { BottomNav } from '@/widgets/BottomNav';
import { UserProvider } from '@/app/ui';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://petagecalculator.vercel.app/'),
  robots: 'all',
  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: '/',
    title,
    description,
  },

  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage,
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}
      className={`${pacifico.variable} h-[max(calc(100%_+_env(safe-area-inset-top)),_100%)] font-sans overscroll-none touch-pan-x touch-pan-y motion-safe:scroll-smooth bg-gradient-to-r from-[#8360c3] to-[#2ebf91]`}
    >
      <body className='h-full py-safe px-safe-or-5 overscroll-none'>
        <UserProvider>
          <NextUIProvider>
            <AriaRouterProvider>
              <FMReducedMotion>
                {children}
                <BottomNav />
                <Analytics />
              </FMReducedMotion>
            </AriaRouterProvider>
          </NextUIProvider>
        </UserProvider>
      </body>
    </html>
  );
}
