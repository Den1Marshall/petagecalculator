'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import { auth, db } from '@/shared/config';
import { IPet } from '@/entities/Pet';
import { petsPlaceholder, UserContext } from '../model';
import { doc, onSnapshot } from 'firebase/firestore';
import { Unsubscribe } from 'firebase/auth';

interface UserProviderProps {
  children?: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);
  const [userPets, setUserPets] = useState<IPet[]>(petsPlaceholder);

  useEffect(() => {
    let snapshotUnsub: Unsubscribe | undefined = undefined;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(true);

      setUser(user);

      if (user) {
        snapshotUnsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
          if (doc.exists()) {
            setUserPets(JSON.parse(doc.get('pets')));
            setIsLoading(false);
          }
        });
      } else {
        setUserPets(petsPlaceholder);
        setIsLoading(false);
        snapshotUnsub && snapshotUnsub();
      }
    });

    return () => {
      unsubscribe();
      snapshotUnsub && snapshotUnsub();
    };
  }, []);

  return (
    <UserContext.Provider value={{ isLoading, user, userPets, setUserPets }}>
      {children}
    </UserContext.Provider>
  );
};
