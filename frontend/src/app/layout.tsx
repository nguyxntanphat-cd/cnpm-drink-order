import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'COLDEN COFFEE – BrewLite',
  description: 'Đặt cà phê không dùng tiền mặt',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased`}>
      <body className="bg-background text-ink min-h-full font-sans">
        <Providers>
          <div className="mx-auto min-h-screen w-full max-w-[430px] px-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
