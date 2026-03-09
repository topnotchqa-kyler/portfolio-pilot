

import { logout } from '@/app/authActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <div className="container mx-auto flex items-center justify-center py-16 px-4 min-h-[calc(100vh-8rem)]" data-testid="dashboard-page">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle><h1 className="font-headline text-3xl font-semibold leading-none tracking-tight" data-testid="dashboard-heading">Welcome to your Dashboard</h1></CardTitle>
          <CardDescription>This is a protected area for members only.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-center">
            <Image 
              src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif"
              alt="Nyan cat animation"
              width={480}
              height={300}
              unoptimized
            />
          </div>
          <p className="mb-6">You have successfully logged in. Explore your member benefits (coming soon!).</p>
          <form action={logout}>
            <Button type="submit" variant="destructive" data-testid="logout-button">Log Out</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
