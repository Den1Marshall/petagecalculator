'use client';
import { Button, Spinner, useDisclosure } from '@nextui-org/react';
import { useContext } from 'react';
import { UserContext } from '@/app/UserProvider';
import { Logout } from '@/features/Logout';
import { Login } from '@/features/Login';

export default function MyPets() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, user } = useContext(UserContext);

  return (
    <main className='h-[calc(100%_-_64px)] flex flex-col'>
      <h1 className='text-center text-6xl font-pacifico mb-10'>My Pets</h1>
      {isLoading ? (
        <Spinner size='lg' />
      ) : user ? (
        <Logout />
      ) : (
        <>
          <Button color='primary' onPress={onOpen}>
            Login
          </Button>
          <Login isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </main>
  );
}
