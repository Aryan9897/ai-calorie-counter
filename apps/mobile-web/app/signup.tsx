import { Redirect, useRouter } from 'expo-router';

import Signup from '@/screens/Signup/Signup';
import { useAuthStatus } from '@/components/useAuthStatus';

export default function SignupRoute() {
  const router = useRouter();
  const status = useAuthStatus();

  if (status === 'authed') return <Redirect href="/dashboard" />;

  return (
    <Signup
      onSignup={() => router.replace('/dashboard')}
      onBack={() => router.back()}
    />
  );
}
