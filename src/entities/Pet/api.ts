import { doc, setDoc } from 'firebase/firestore';
import { IPet } from './model';
import { db, storage } from '@/shared/config/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';

const deletePetImage = async (userUid: string, petToDeleteName: string) => {
  try {
    await deleteObject(
      ref(storage, `/users/${userUid}/pets/${petToDeleteName}`)
    );
  } catch (error) {
    const firebaseError = error as FirebaseError;

    if (firebaseError.code !== 'storage/object-not-found') {
      throw firebaseError;
    }
  }
};

export const deletePet = async (
  userUid: string,
  petToDeleteName: string,
  userPets: IPet[]
) => {
  const filteredArr = userPets.filter((pet) => pet.name !== petToDeleteName);

  try {
    const docRef = doc(db, 'users', userUid);

    await deletePetImage(userUid, petToDeleteName);

    await setDoc(
      docRef,
      { pets: JSON.stringify(filteredArr) },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};
