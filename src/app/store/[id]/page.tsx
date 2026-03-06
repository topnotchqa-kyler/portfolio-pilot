'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { productsData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { id } = use(params);
  const product = productsData.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your shopping cart.`,
    });
  };

  return (
    <div className="container mx-auto py-16 px-4" data-testid={`product-detail-page-${product.id}`}>
      <div className="mb-8">
        <Button variant="ghost" asChild className="p-0 hover:bg-transparent">
          <Link href="/store" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Store
          </Link>
        </Button>
      </div>
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button size="lg" onClick={handleAddToCart} data-testid="add-to-cart-button">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/checkout" data-testid="go-to-checkout-button">
                Go to Checkout
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
