import { getSupabase } from "./client";

export async function signUp(email: string, password: string) {
  const { data, error } = await getSupabase().auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await getSupabase().auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await getSupabase().auth.signOut();
  if (error) throw error;
}

export function onAuthChange(cb: (userId: string | null) => void) {
  const { data } = getSupabase().auth.onAuthStateChange((_event, session) => {
    cb(session?.user.id ?? null);
  });
  return () => data.subscription.unsubscribe();
}

export async function getCurrentUserId(): Promise<string | null> {
  const { data } = await getSupabase().auth.getUser();
  return data.user?.id ?? null;
}
