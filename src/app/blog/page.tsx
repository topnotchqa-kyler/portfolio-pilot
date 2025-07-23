import Link from 'next/link';
import { blogPostsData } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Blog</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          My thoughts on technology, development, and everything in between.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPostsData.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader>
                <p className="text-sm text-muted-foreground">{post.date}</p>
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
    </div>
  );
}
