
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { productsData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

function getProductById(id: string) {
  return productsData.find(p => p.id === id);
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-16 px-4" data-testid={`product-detail-page-${product.id}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg bg-muted">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover p-4"
            data-ai-hint={product.aiHint}
            data-testid="product-image"
          />
        </div>
        <div className="space-y-6">
          <Badge>In Stock</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-headline" data-testid="product-name">{product.name}</h1>
          <p className="text-3xl font-semibold text-primary" data-testid="product-price">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground text-lg" data-testid="product-description">{product.description}</p>
          <div className="flex items-center gap-4">
            <Button size="lg" asChild>
                <Link href="/checkout" data-testid="add-to-cart-button">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
                <Link href="/store" data-testid="continue-shopping-button">
                    Continue Shopping
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
