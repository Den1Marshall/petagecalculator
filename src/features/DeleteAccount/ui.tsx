'use client';
import { UserContext } from '@/app/ui';
import { db, storage } from '@/shared/config/firebase';
import { Button } from '@nextui-org/react';
import { deleteUser } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, listAll, ref } from 'firebase/storage';
import { FC, useContext, useState } from 'react';
import { reauthenticateUser } from '@/shared/api';
import { FirebaseError } from 'firebase/app';

export const DeleteAccount: FC = () => {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    if (user && confirm('Are you sure? This action cannot be undone.')) {
      try {
        setIsLoading(true);

        await reauthenticateUser(user);

        // delete user firebase storage (pets images)
        const petsStorageRef = ref(storage, `users/${user.uid}/pets`);
        const petsStorageList = await listAll(petsStorageRef);
        for (const itemRef of petsStorageList.items) {
          await deleteObject(itemRef);
        }

        // delete user from db
        await deleteDoc(doc(db, 'users', user.uid));

        // delete user from auth
        await deleteUser(user);
      } catch (error) {
        const firebaseError = error as FirebaseError;
        const defaultError = error as Error;

        alert(firebaseError.message ?? defaultError.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Button
      fullWidth
      color='danger'
      onPress={handlePress}
      isDisabled={!user}
      isLoading={isLoading}
    >
      Delete account
    </Button>
  );
};
