import { useRouter } from 'expo-router';

import Signup from '@/screens/Signup/Signup';

export default function SignupRoute() {
  const router = useRouter();

  return (
    <Signup
      onSignup={() => router.replace('/dashboard')}
      onBack={() => router.back()}
    />
  );
}
