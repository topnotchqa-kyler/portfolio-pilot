
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kyler Chavez | QA Engineer & Software Tester in Colorado',
  description:
    'Kyler Chavez is an experienced manual and automated QA Engineer based in Mead, Colorado. Skilled in Playwright, Cypress, WebdriverIO, TestRail, and Zephyr.',
  alternates: {
    canonical: '/',
  },
};
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Bot, PenTool, Accessibility, Hand } from 'lucide-react';
import { projectsData } from '@/lib/data';
import { getSortedPostsData } from '@/lib/blog';

export default function Home() {
  const featuredProjects = projectsData.slice(0, 2);
  const recentPosts = getSortedPostsData().slice(0, 2);

  const skills = [
    { name: 'Manual', icon: <Hand className="w-8 h-8 text-primary" />, description: 'Meticulous, user-centric testing using tools like TestRail and Zephyr to ensure flawless user experiences.' },
    { name: 'Automation', icon: <Bot className="w-8 h-8 text-primary" />, description: 'Specializing in web and native app automation with tools like WebdriverIO and Appium.' },
    { name: 'Design', icon: <PenTool className="w-8 h-8 text-primary" />, description: 'A keen eye for UI/UX, ensuring intuitive and beautiful interfaces using design tools like Figma.' },
    { name: 'Accessibility', icon: <Accessibility className="w-8 h-8 text-primary" />, description: 'Ensuring applications meet WCAG guidelines using tools like Lighthouse.' },
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:9002';

  return (
    <div className="flex flex-col items-center" data-testid="home-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Kyler Chavez',
            url: siteUrl,
            image: `${siteUrl}/assets/kyler-chavez.jpg`,
            jobTitle: 'QA Engineer',
            worksFor: {
              '@type': 'Organization',
              name: 'Top Notch QA',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Mead',
              addressRegion: 'CO',
              addressCountry: 'US',
            },
            sameAs: [
              'https://www.linkedin.com/in/kyler-chavez/',
              'https://github.com/topnotchqa-kyler',
            ],
          }),
        }}
      />
      <section id="hero" className="w-full py-20 md:py-32 bg-card" data-testid="hero-section">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground mb-4">
            Digital Quality ... Assured
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            As an experienced manual and automated quality assurance engineer, I bring a unique background from a twenty-year career in hospitality to the world of tech. I am adaptable, creative, and passionate with a love for a good bug hunt.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/projects" data-testid="hero-view-work-button">View My Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact" data-testid="hero-get-in-touch-button">Get In Touch</Link>
            </Button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto italic">
              This site serves as both a professional portfolio and a functional sandbox for demonstrating test automation suites.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="w-full py-20 md:py-24" data-testid="skills-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">My Skillset</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill) => (
              <Card key={skill.name} className="text-center hover:shadow-lg transition-shadow duration-300" data-testid={`skill-card-${skill.name.toLowerCase()}`}>
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                    {skill.icon}
                  </div>
                  <CardTitle className="font-headline">{skill.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-projects" className="w-full py-20 md:py-24 bg-card" data-testid="featured-projects-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden group" data-testid={`featured-project-${project.id}`}>
                <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800">
                  <Image src={project.imageUrl} alt={project.title} fill className={`${project.title.includes('WebdriverIO') || project.title.includes('Playwright') || project.title.includes('Cypress') ? 'object-contain' : 'object-cover'} transition-transform duration-300 group-hover:scale-105 p-4`} data-ai-hint="abstract technology" />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">{project.title}</CardTitle>
                  <CardDescription>{project.description.substring(0, 100)}...</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link href={`/projects`} data-testid={`featured-project-link-${project.id}`}>View Project<span className="sr-only">: {project.title}</span> <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/projects" data-testid="see-all-projects-button">See All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="blog" className="w-full py-20 md:py-24" data-testid="blog-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">From the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col" data-testid={`recent-post-${post.slug}`}>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <CardTitle className="font-headline">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link href={`/blog/${post.slug}`} data-testid={`recent-post-link-${post.slug}`}>Read More<span className="sr-only">: {post.title}</span> <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild>
              <Link href="/blog" data-testid="see-all-posts-button">See All Posts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
