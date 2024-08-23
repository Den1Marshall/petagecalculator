import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../config/firebase';

export const deleteUserPetImage = async (userUid: string, petUuid: string) => {
  try {
    const imageRef = ref(storage, `/users/${userUid}/pets/${petUuid}`);

    await deleteObject(imageRef);
  } catch (error) {
    throw error;
  }
};
