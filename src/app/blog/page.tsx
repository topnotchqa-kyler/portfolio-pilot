import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const POSTS_PER_PAGE = 4;

export default function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const allPosts = getSortedPostsData();
  
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Blog</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          My thoughts on technology, software testing, and everything in between.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paginatedPosts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader>
                <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <span className="text-primary font-semibold flex items-center">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-8 mt-16">
        {currentPage > 1 && (
          <Button asChild variant="outline">
            <Link href={`/blog?page=${currentPage - 1}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
        )}
        <span className="text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <Button asChild variant="outline">
            <Link href={`/blog?page=${currentPage + 1}`}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
