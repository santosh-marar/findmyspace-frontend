import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';
import { Toaster } from 'react-hot-toast';
import CookieConsent from '@/components/custom/CookieConsentComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FindMySpace.live',
  description: 'Find Your Perfect Room with FindMySpace.live',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
