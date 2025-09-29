import "./globals.css";
import { Rubik } from 'next/font/google';
import { AuthProvider } from '../components/AuthProvider';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: "ScanCycle - AI Waste Scanner",
  description: "Platform AI untuk mengidentifikasi, memilah, dan mengelola sampah dengan teknologi AI",
  keywords: "sampah, AI, pemilahan sampah, lingkungan, daur ulang, Indonesia",
  authors: [{ name: "Slaviors" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${rubik.variable} antialiased min-h-screen bg-gray-50 font-rubik`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}