import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../config';

export const deleteUserPetImage = async (userUid: string, petUuid: string) => {
  const imageRef = ref(storage, `/users/${userUid}/pets/${petUuid}`);

  await deleteObject(imageRef);
};
