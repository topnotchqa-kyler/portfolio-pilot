import { logout } from '@/app/authActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="container mx-auto flex items-center justify-center py-16 px-4 min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Welcome to your Dashboard</CardTitle>
          <CardDescription>This is a protected area for members only.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">You have successfully logged in. Explore your member benefits (coming soon!).</p>
          <form action={logout}>
            <Button type="submit" variant="destructive">Log Out</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
