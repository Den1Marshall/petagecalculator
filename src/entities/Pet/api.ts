import { doc, setDoc } from 'firebase/firestore';
import { IPet } from './model';
import { db, storage } from '@/shared/config/firebase';
import { deleteObject, ref } from 'firebase/storage';

export const deletePet = async (
  userUid: string,
  petToDeleteName: string,
  userPets: IPet[]
) => {
  const filteredArr = userPets.filter((pet) => pet.name !== petToDeleteName);

  try {
    const docRef = doc(db, 'users', userUid);

    await deleteObject(
      ref(storage, `/users/${userUid}/pets/${petToDeleteName}`)
    );

    await setDoc(
      docRef,
      { pets: JSON.stringify(filteredArr) },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};
