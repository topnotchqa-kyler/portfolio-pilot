
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Code, PenTool, Database, Cloud, TestTubeDiagonal } from 'lucide-react';
import { projectsData, blogPostsData } from '@/lib/data';

export default function Home() {
  const featuredProjects = projectsData.slice(0, 2);
  const recentPosts = blogPostsData.slice(0, 2);

  const skills = [
    { name: 'Frontend', icon: <Code className="w-8 h-8 text-primary" />, description: 'React, Next.js, TypeScript, TailwindCSS' },
    { name: 'Backend', icon: <Database className="w-8 h-8 text-primary" />, description: 'Node.js, Python, Firebase, SQL/NoSQL' },
    { name: 'DevOps', icon: <Cloud className="w-8 h-8 text-primary" />, description: 'Docker, CI/CD, Google Cloud' },
    { name: 'Testing', icon: <TestTubeDiagonal className="w-8 h-8 text-primary" />, description: 'Jest, Cypress, Playwright' },
  ];

  return (
    <div className="flex flex-col items-center">
      <section id="hero" className="w-full py-20 md:py-32 bg-card">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground mb-4">
            Forging Digital Quality, From Code to Customer
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            As an experienced manual and automated quality assurance engineer, I bring a unique background from a twenty-year career in hospitality to the world of tech. I am adaptable, creative, and passionate with a love for a good bug hunt on projects for brands like Nike, Vail Resorts, and Chipotle.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/projects">View My Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="skills" className="w-full py-20 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">My Skillset</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill) => (
              <Card key={skill.name} className="text-center hover:shadow-lg transition-shadow duration-300">
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

      <section id="featured-projects" className="w-full py-20 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden group">
                <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800">
                  <Image src={project.imageUrl} alt={project.title} fill className="object-contain transition-transform duration-300 group-hover:scale-105 p-4" data-ai-hint="abstract technology" />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">{project.title}</CardTitle>
                  <CardDescription>{project.description.substring(0, 100)}...</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link href={`/projects`}>View Project <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/projects">See All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="blog" className="w-full py-20 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">From the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col">
                <CardHeader>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                  <CardTitle className="font-headline">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link href={`/blog/${post.slug}`}>Read More <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
