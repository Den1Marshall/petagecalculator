import type { Metadata, Viewport } from 'next';
import '@/app/index.css';
import { RSReducedMotion } from '@/shared/ui/RSReducedMotion';
import { FMReducedMotion } from '@/shared/ui/FMReducedMotion';
import { startupImage } from './startupImage';
import { Pacifico } from 'next/font/google';
import { title } from './title';
import { description } from './description';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title,
  description,
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
      className={`${pacifico.variable} font-sans text-white`}
    >
      <body>
        <FMReducedMotion>
          {children}
          <Analytics />
        </FMReducedMotion>
        <RSReducedMotion />
      </body>
    </html>
  );
}
