import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster"
import { Chatbot } from '@/components/Chatbot';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import { checkAuth } from '@/lib/auth';
import { CartProvider } from '@/context/CartContext';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontSerif = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-serif',
});


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:9002'),
  title: {
    default: 'Kyler Chavez | QA Engineer & Software Tester in Colorado',
    template: '%s | Kyler Chavez',
  },
  description:
    'Kyler Chavez is a QA Engineer based in Mead, Colorado, specializing in manual and automated software testing with Playwright, Cypress, and WebdriverIO.',
  keywords: [
    'Kyler Chavez',
    'QA Engineer',
    'Quality Assurance Engineer',
    'Software QA',
    'Software Testing',
    'Manual Testing',
    'Automated Testing',
    'Test Automation',
    'Playwright',
    'Cypress',
    'WebdriverIO',
    'Colorado',
    'QA Engineer Colorado',
    'Quality Assurance Colorado',
    'Software Testing Colorado',
    'Software QA Services Colorado',
    'Manual Quality Assurance Colorado',
    'QA Engineer Mead Colorado',
  ],
  authors: [{ name: 'Kyler Chavez' }],
  creator: 'Kyler Chavez',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:9002',
    siteName: 'Kyler Chavez — QA Engineer',
    title: 'Kyler Chavez | QA Engineer & Software Tester in Colorado',
    description:
      'Kyler Chavez is a QA Engineer based in Mead, Colorado, specializing in manual and automated software testing with Playwright, Cypress, and WebdriverIO.',
    images: [
      {
        url: '/assets/kyler-chavez.jpg',
        width: 1200,
        height: 630,
        alt: 'Kyler Chavez — QA Engineer in Colorado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyler Chavez | QA Engineer & Software Tester in Colorado',
    description:
      'Kyler Chavez is a QA Engineer based in Mead, Colorado, specializing in manual and automated software testing.',
    images: ['/assets/kyler-chavez.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header isLoggedIn={isLoggedIn} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Chatbot />
          <Toaster />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
