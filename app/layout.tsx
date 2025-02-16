import type { Metadata, Viewport } from 'next';
import { startupImage } from './startupImage';
import { Pacifico } from 'next/font/google';
import { description } from './description';
import { MotionProvider, UserProvider, HeroUIProvider } from '@/app/providers';
import { BottomNav } from '@/widgets/BottomNav';
import { GoogleAnalytics } from '@next/third-parties/google';

import '@/app/index.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Pet Age Calculator',
    default: 'Pet Age Calculator',
  },
  description,
  metadataBase: new URL('https://petagecalculator.vercel.app/'),
  robots: 'all',
  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: '/',
    title: 'Pet Age Calculator',
    description,
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Pet Age Calculator',
    description,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage,
  },

  verification: {
    google: 'WJCIqKWRiKcicndkd2oU_2ZVJ9UGzHFXVK-qayzv8po',
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  maximumScale: 1,
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
      <body className='h-full py-safe px-safe-or-5 overscroll-none antialiased'>
        <UserProvider>
          <HeroUIProvider>
            <MotionProvider>
              {children}

              <BottomNav />
            </MotionProvider>
          </HeroUIProvider>
        </UserProvider>
      </body>

      <GoogleAnalytics gaId='G-RSXE80Q5J8' />
    </html>
  );
}
