import { useRouter } from 'expo-router';

import Login from '@/screens/Login/Login';

export default function LoginRoute() {
  const router = useRouter();

  return (
    <Login
      onLogin={() => router.replace('/dashboard')}
      onSignup={() => router.push('/signup')}
    />
  );
}
