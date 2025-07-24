
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/data';
import { Skeleton } from './ui/skeleton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/store/${product.id}`} className="block group">
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-square w-full bg-muted overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 p-4"
              data-ai-hint={product.aiHint}
            />
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-lg truncate">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
