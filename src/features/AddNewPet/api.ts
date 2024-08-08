import { storage } from '@/shared/config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const uploadUserPetImage = async (
  userUid: string,
  petName: string,
  image: File | null
): Promise<string | null> => {
  try {
    if (image === null) return null;

    const storageRef = ref(storage, `/users/${userUid}/pets/${petName}`);

    const uploadResult = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(uploadResult.ref);

    return url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
