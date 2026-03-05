
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Terminal, ClipboardList } from 'lucide-react';
import type { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Use object-contain for logos/icons (test suite projects and the manual test collection)
  const isLogo = !!(project.testSuiteSlug || project.manualTestsSlug);

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-testid={`project-card-${project.id}`}>
      <div className="relative h-56 w-full bg-muted overflow-hidden">
          <Image 
            src={project.imageUrl} 
            alt={project.title} 
            fill 
            className={`${isLogo ? 'object-contain' : 'object-cover'} p-4`} 
            data-ai-hint={project.aiHint} 
          />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="font-headline">{project.title}</CardTitle>
          {project.inProgress && (
            <Badge variant="outline" className="shrink-0 text-muted-foreground">
              Coming Soon
            </Badge>
          )}
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </div>
      </CardContent>
      {(project.liveUrl || project.githubUrl || project.testSuiteSlug || project.manualTestsSlug) && (
        <CardFooter className="pt-4">
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button asChild variant="outline" size="sm">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid={`project-github-link-${project.id}`}>
                  <Github className="w-4 h-4" /> GitHub
                </Link>
              </Button>
            )}
            {project.testSuiteSlug && (
              <Button asChild size="sm">
                <Link href={`/projects/${project.id}`} data-testid={`project-demo-link-${project.id}`}>
                  <Terminal className="w-4 h-4" /> View Demo
                </Link>
              </Button>
            )}
            {project.manualTestsSlug && (
              <Button asChild size="sm" variant="outline">
                <Link href={`/projects/${project.id}`} data-testid={`project-manual-link-${project.id}`}>
                  <ClipboardList className="w-4 h-4" /> View Test Cases
                </Link>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild size="sm">
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
