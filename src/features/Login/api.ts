import { db } from '@/shared/config';
import { setDoc, doc, getDoc } from 'firebase/firestore';

export const addNewUserToDatabase = async (userUid: string) => {
  const docRef = doc(db, 'users', userUid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(doc(db, 'users', userUid), {
      pets: '[]',
    });
  }
};
