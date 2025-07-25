

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import type { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-testid={`project-card-${project.id}`}>
      <div className="relative h-56 w-full bg-muted overflow-hidden">
          <Image 
            src={project.imageUrl} 
            alt={project.title} 
            fill 
            className={`${project.title === 'Test Automation' ? 'object-contain' : 'object-cover'} p-4`} 
            data-ai-hint={project.aiHint} 
          />
      </div>
      <CardHeader>
        <CardTitle className="font-headline">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </div>
      </CardContent>
      {(project.liveUrl || project.githubUrl) && (
        <CardFooter className="pt-4">
          <div className="flex gap-4">
            {project.githubUrl && (
              <Button asChild variant="outline">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid={`project-github-link-${project.id}`}>
                  <Github /> GitHub
                </Link>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild>
                <Link href={project.liveUrl} data-testid={`project-live-link-${project.id}`}>
                  Live Demo
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
