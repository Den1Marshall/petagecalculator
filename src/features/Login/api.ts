import { db } from '@/shared/config/firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';

export const addNewUserToDatabase = async (userUid: string) => {
  try {
    const docRef = doc(db, 'users', userUid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, 'users', userUid), {
        pets: '[]',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
