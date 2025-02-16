'use client';

import { IPet } from '@/entities/Pet';
import { User } from 'firebase/auth';
import { createContext } from 'react';
import { petsPlaceholder } from './petsPlaceholder';

interface UserContextProps {
  isLoading: boolean;
  user: User | null;
  userPets: IPet[];
  setUserPets: (pets: IPet[]) => void;
}

export const UserContext = createContext<UserContextProps>({
  isLoading: true,
  user: null,
  userPets: petsPlaceholder,
  setUserPets: () => {},
});
