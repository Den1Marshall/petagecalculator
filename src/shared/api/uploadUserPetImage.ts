import { storage } from '@/shared/config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const uploadUserPetImage = async (
  userUid: string,
  petName: string,
  image: File | null
): Promise<string> => {
  try {
    if (image === null) throw new Error('Image is null');

    const storageRef = ref(storage, `/users/${userUid}/pets/${petName}`);

    const uploadResult = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(uploadResult.ref);

    return url;
  } catch (error) {
    throw error;
  }
};
