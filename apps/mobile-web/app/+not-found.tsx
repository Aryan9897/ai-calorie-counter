import { Stack } from 'expo-router';

import NotFound from '@/screens/NotFound/NotFound';

export default function NotFoundRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <NotFound />
    </>
  );
}
