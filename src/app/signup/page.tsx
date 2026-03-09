import { SignupForm } from './SignupForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <div className="container mx-auto flex items-center justify-center py-16 px-4 min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle><h1 className="font-headline text-2xl font-semibold leading-none tracking-tight">Create an Account</h1></CardTitle>
          <CardDescription>Join the community and get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
