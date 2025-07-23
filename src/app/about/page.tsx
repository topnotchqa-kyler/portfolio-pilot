import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Briefcase, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <section id="intro" className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl">
              <Image
                src="https://placehold.co/600x600.png"
                alt="A professional portrait"
                fill
                className="object-cover"
                data-ai-hint="professional portrait"
              />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">About Me</h1>
            <p className="text-lg text-muted-foreground">
              I'm a passionate and results-driven software developer with a knack for creating elegant, efficient, and user-friendly web applications. With a foundation in modern web technologies, I specialize in building full-stack solutions that solve real-world problems. My journey in tech is driven by a relentless curiosity and a desire to craft experiences that are not only functional but also delightful to use.
            </p>
          </div>
        </div>
      </section>

      <section id="philosophy" className="py-16 bg-card rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">My Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                I believe in the power of technology to innovate and transform. I constantly explore new tools and techniques to stay at the forefront of web development.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">Quality Craftsmanship</h3>
              <p className="text-muted-foreground">
                Clean code, robust architecture, and attention to detail are the cornerstones of my work. I strive for excellence in every line of code I write.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">User-Centric Approach</h3>
              <p className="text-muted-foreground">
                The best applications are built with the user in mind. I prioritize creating intuitive and accessible interfaces that provide a seamless experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
