
import type { Metadata } from 'next';
import { projectsData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Browse QA projects by Kyler Chavez, including automated test suites built with Playwright, Cypress, and WebdriverIO demonstrating manual and automated quality assurance skills.',
  alternates: {
    canonical: '/projects',
  },
};
import { ProjectCard } from '@/components/ProjectCard';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-16 px-4" data-testid="projects-page">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline" data-testid="projects-heading">My Projects</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          A collection of my work, from web applications to AI tools.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="projects-list">
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
