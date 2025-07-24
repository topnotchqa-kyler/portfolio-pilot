import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Get In Touch</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <h2 className="text-2xl font-bold font-headline">Contact Information</h2>
            <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:kyler.chavez@gmail.com" className="text-muted-foreground hover:text-primary">kyler.chavez@gmail.com</a>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">203-919-0099</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
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
            <form action="https://formspree.io/f/kyler.chavez@gmail.com" method="POST" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" name="name" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" name="email" type="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" name="message" placeholder="Your Message" required rows={6} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
