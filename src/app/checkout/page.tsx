'use client';

import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

const checkoutSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip: z.string().min(1, { message: "ZIP code is required" }),
  cardNumber: z.string().min(1, { message: "Card number is required" }).regex(/^(?:[0-9]{4} ){3}[0-9]{4}$/, { message: "Invalid format (**** **** **** ****)"}),
  expiryDate: z.string().min(1, { message: "Expiry date is required" }).regex(/^(0[1-9]|1[0-2]) \/ ([0-9]{2})$/, { message: "Invalid format (MM / YY)"}),
  cvc: z.string().min(3, { message: "CVC must be 3 digits" }).max(3, { message: "CVC must be 3 digits" }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  const fillFormForTesting = () => {
    form.reset({
      firstName: 'Jane',
      lastName: 'Doe',
      address: '456 Test Ave',
      city: 'Debug City',
      state: 'TS',
      zip: '54321',
      cardNumber: '4242 4242 4242 4242',
      expiryDate: '12 / 26',
      cvc: '321',
    });
  };

  const onSubmit = (values: CheckoutFormValues) => {
    setIsAlertOpen(true);
    clearCart();
  };

  const shipping = cart.length > 0 ? 5.00 : 0;
  const tax = totalPrice * 0.0825;
  const grandTotal = totalPrice + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center" data-testid="empty-cart-view">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-muted p-8 rounded-full">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-bold font-headline">Your cart is empty</h1>
          <p className="text-muted-foreground text-lg max-w-md">
            Looks like you haven't added anything to your cart yet. Head over to our store to discover amazing products!
          </p>
          <Button asChild size="lg">
            <Link href="/store">Browse Store</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4" data-testid="checkout-page">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline" data-testid="checkout-heading">Checkout</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Review your items and provide your details to complete your order.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-testid="checkout-form">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Your Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-muted rounded overflow-hidden flex-shrink-0 relative">
                        <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full p-1" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} data-testid="checkout-first-name-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} data-testid="checkout-last-name-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} data-testid="checkout-address-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco" {...field} data-testid="checkout-city-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="CA" {...field} data-testid="checkout-state-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="94107" {...field} data-testid="checkout-zip-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>

              <CardHeader className="mt-4 border-t">
                <CardTitle className="font-headline">Payment Details</CardTitle>
                <CardDescription>Demo checkout only. Use dummy data.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input placeholder="**** **** **** 1234" {...field} data-testid="checkout-card-number-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM / YY" {...field} data-testid="checkout-expiry-date-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} data-testid="checkout-cvc-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax (8.25%)</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg text-primary">
                  <p>Total</p>
                  <p>${grandTotal.toFixed(2)}</p>
                </div>
                <div className="mt-6 space-y-3">
                  <Button type="submit" className="w-full" size="lg" data-testid="checkout-place-order-button">Place Order</Button>
                  <Button type="button" variant="outline" className="w-full" onClick={fillFormForTesting} data-testid="checkout-fill-form-button">Fill Form (Debug)</Button>
                </div>
                <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                  <AlertDialogContent data-testid="checkout-confirmation-dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Order Confirmation</AlertDialogTitle>
                      <AlertDialogDescription>
                        Thank you for your order! This is a demonstration store. No items will be shipped and your card has not been charged.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction data-testid="checkout-confirmation-ok-button" asChild>
                        <Link href="/">OK</Link>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
