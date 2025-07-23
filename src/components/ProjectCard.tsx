'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/data';
import { useEffect, useState } from 'react';
import { generateProductImage } from '@/app/store/actions';
import { Skeleton } from './ui/skeleton';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageUrl, setImageUrl] = useState(project.imageUrl);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchImage() {
      if (project.title !== 'Test Automation' && project.imageUrl.startsWith('https://placehold.co')) {
        const result = await generateProductImage(project.title);
        if (result.success && result.imageUrl) {
          setImageUrl(result.imageUrl);
        }
      }
      setIsLoading(false);
    }
    fetchImage();
  }, [project.title, project.imageUrl]);

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56 w-full bg-muted overflow-hidden">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <Image 
            src={imageUrl} 
            alt={project.title} 
            fill 
            className={`${project.title === 'Test Automation' ? 'object-contain' : 'object-cover'} p-4`} 
            data-ai-hint={project.aiHint} 
          />
        )}
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
      <CardFooter className="flex justify-start gap-2">
        {project.liveUrl && (
          <Button asChild>
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2" /> Live Demo
            </Link>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild variant="outline">
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2" /> GitHub
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
