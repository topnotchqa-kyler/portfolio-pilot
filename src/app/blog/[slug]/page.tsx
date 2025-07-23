import { notFound } from 'next/navigation';
import { blogPostsData } from '@/lib/data';

export async function generateStaticParams() {
  return blogPostsData.map(post => ({
    slug: post.slug,
  }));
}

function getPostBySlug(slug: string) {
  return blogPostsData.find(post => post.slug === slug);
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-muted-foreground">{post.date}</p>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mt-2">{post.title}</h1>
        </div>
        <div 
            className="prose-p:text-lg prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} 
        />
      </article>
    </div>
  );
}
