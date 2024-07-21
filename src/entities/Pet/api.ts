import { doc, setDoc } from 'firebase/firestore';
import { IPet } from './model';
import { db } from '@/shared/config/firebase';

export const deletePet = async (
  userUid: string,
  petToDeleteName: string,
  userPets: IPet[]
) => {
  const filteredArr = userPets.filter((pet) => pet.name !== petToDeleteName);

  try {
    const docRef = doc(db, 'users', userUid);

    await setDoc(
      docRef,
      { pets: JSON.stringify(filteredArr) },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};
