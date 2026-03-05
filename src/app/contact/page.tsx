'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }).max(1000, { message: "Message must be 1000 characters or fewer" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const response = await fetch('https://formspree.io/f/xwpqlzgw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="container mx-auto py-16 px-4" data-testid="contact-page">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline" data-testid="contact-heading">Get In Touch</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <h2 className="text-2xl font-bold font-headline">Contact Information</h2>
            <div className="flex items-center gap-4" data-testid="contact-info-email">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:kyler.chavez@gmail.com" className="text-muted-foreground hover:text-primary">kyler.chavez@gmail.com</a>
                </div>
            </div>
            <div className="flex items-center gap-4" data-testid="contact-info-phone">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">203-919-0099</p>
                </div>
            </div>
            <div className="flex items-center gap-4" data-testid="contact-info-location">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">Mead, CO</p>
                </div>
            </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Send me a message</CardTitle>
            <CardDescription>I'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center" data-testid="contact-success-message">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="text-lg font-semibold">Message sent!</p>
                <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
                <Button variant="outline" onClick={() => setSubmitStatus('idle')} data-testid="contact-send-another-button">
                  Send another message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} data-testid="contact-name-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your Email" {...field} data-testid="contact-email-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your Message" rows={6} maxLength={1000} {...field} data-testid="contact-message-textarea" />
                        </FormControl>
                        <div className="flex justify-between items-center">
                          <FormMessage />
                          <span className={`text-xs ml-auto ${field.value.length > 900 ? 'text-destructive' : 'text-muted-foreground'}`} data-testid="contact-message-char-count">
                            {field.value.length}/1000
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-destructive text-sm" data-testid="contact-error-message">
                      <AlertCircle className="h-4 w-4" />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                    data-testid="contact-send-button"
                  >
                    {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
