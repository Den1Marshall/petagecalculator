'use client';
import { UserContext } from '@/app/UserProvider';
import { auth } from '@/shared/config/firebase';
import { Button } from '@nextui-org/react';
import { FirebaseError } from 'firebase/app';
import { FC, useContext, useState } from 'react';

export const Logout: FC = () => {
  const { user, isLoading: userIsLoading } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      auth.signOut();
    } catch (error) {
      const firebaseError = error as FirebaseError;

      console.log(firebaseError.code);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      fullWidth
      color='danger'
      onPress={handleSignOut}
      isDisabled={userIsLoading || !user}
      isLoading={isLoading}
    >
      Log Out
    </Button>
  );
};
