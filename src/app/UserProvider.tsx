'use client';
import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { auth } from '@/shared/config/firebase';
import { User } from 'firebase/auth';

interface UserContextProps {
  isLoading: boolean;
  user: User | null;
}

export const UserContext = createContext<UserContextProps>({
  isLoading: true,
  user: null,
});

interface UserProviderProps {
  children?: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <UserContext.Provider value={{ isLoading, user }}>
      {children}
    </UserContext.Provider>
  );
};
