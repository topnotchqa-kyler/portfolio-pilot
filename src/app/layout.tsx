import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster"
import { Chatbot } from '@/components/Chatbot';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import { checkAuth } from '@/lib/auth';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontSerif = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-serif',
});


export const metadata: Metadata = {
  title: "Kyler's Testing Playground",
  description: "Welcome to my testing playground.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = await checkAuth();

  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn("font-body antialiased", fontSans.variable, fontSerif.variable)}>
        <div className="flex min-h-screen flex-col">
          <Header isLoggedIn={isLoggedIn} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Chatbot />
        <Toaster />
      </body>
    </html>
  );
}
