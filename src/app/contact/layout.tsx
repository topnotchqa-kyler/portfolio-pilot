import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Kyler Chavez, a QA Engineer based in Mead, Colorado. Open to software testing and quality assurance opportunities across Colorado and remote.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
