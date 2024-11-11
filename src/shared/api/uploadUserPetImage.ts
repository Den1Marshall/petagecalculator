import { storage } from '@/shared/config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const uploadUserPetImage = async (
  userUid: string,
  petUuid: string,
  image: File | null
): Promise<string> => {
  if (image === null) throw new Error('Image is null');

  const storageRef = ref(storage, `/users/${userUid}/pets/${petUuid}`);

  const uploadResult = await uploadBytes(storageRef, image);
  const url = await getDownloadURL(uploadResult.ref);

  return url;
};
