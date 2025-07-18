import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const AuthContext = createContext<{
  login: (a: Session) => void;
  logout: () => void;
  session?: Session | null;
}>({
  login: () => null,
  logout: () => null,
  session: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);

  const login = (session: Session) => {
    setSession(session);
  };

  const logout = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, session }}>
      {children}
    </AuthContext.Provider>
  );
};
