import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Provider from './_provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Groupon Wiki',
  description: 'Search Groupon wiki assesment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased page-container`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
