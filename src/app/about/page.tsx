
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Kyler Chavez — a QA Engineer based in Mead, Colorado with a unique background in hospitality turned tech, now specializing in manual and automated software testing.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4" data-testid="about-page">
      <section id="story" aria-labelledby="story-heading">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/assets/kyler-chavez.jpg"
                alt="Kyler Chavez"
                fill
                className="object-cover"
                data-testid="about-portrait"
              />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <h1 id="story-heading" className="text-4xl md:text-5xl font-bold font-headline" data-testid="about-heading">My Story</h1>
            <div className="prose prose-lg dark:prose-invert max-w-none" data-testid="about-story-content">
                <p>
                    I was born in Karachi, Pakistan to a Mexican father and an American mother. We moved to Hong Kong when I was 3 and then, finally, to Connecticut when I was 7. After attending elementary and middle school there, I spent my high school years at Northfield Mount Hermon - a college preparatory boarding school in Western Massachusetts.
                </p>
                <p>
                    Having worked in kitchens all through high school I developed a passion for food. This led me to the Culinary Institute of America in Hyde Park, NY to pursue a degree in Culinary Arts. I then completed my education with a Bachelors of Science in Hospitality Administration at Boston University where I graduated Summa Cum Laude in 2011.
                </p>
                <p>
                    I spent five years working for Hyatt Hotels in Boston, Denver, and Maui before finding my way to Alaska, where I managed restaurant operations for the 49th State Brewing Company. After meeting the woman who would become my wife, we moved back to Colorado to set down roots.
                </p>
                <p>
                    Once Covid hit in 2020 and completely upended the restaurant industry, I decided it was time for a change. Having always had a passion for computers, and data in particular, I decided to attend a bootcamp for Data Analytics & Visualization through the University of Denver. After successfully completing that program I started working with Top Notch QA as a Quality Assurance Engineer.
                </p>
                <p>
                    Since then my wife, Kaitlyn, and I have had a son - Ryker Allen, and settled in a house in Mead, Colorado where we have three cats and spend most of our days gardening, cooking, and enjoying time together as a family.
                </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
