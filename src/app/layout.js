import "./globals.css";
import { AuthProvider } from '../components/AuthProvider';

export const metadata = {
  title: "ScanCycle - Platform AI Manajemen Sampah Cerdas",
  description: "Platform AI untuk mengidentifikasi, memilah, dan mengelola sampah dengan teknologi Gemini AI",
  keywords: "sampah, AI, pemilahan sampah, lingkungan, daur ulang, Indonesia",
  authors: [{ name: "ScanCycle Team" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-gray-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
