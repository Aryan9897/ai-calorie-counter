import { useEffect, useState } from 'react';
import { getCurrentUserId, onAuthChange } from '@calorie/services';

export type AuthStatus = 'loading' | 'authed' | 'anon';

export function useAuthStatus(): AuthStatus {
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let cancelled = false;
    getCurrentUserId().then((uid) => {
      if (!cancelled) setStatus(uid ? 'authed' : 'anon');
    });
    const unsubscribe = onAuthChange((uid) => {
      setStatus(uid ? 'authed' : 'anon');
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return status;
}
