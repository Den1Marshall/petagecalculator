'use client';
import { ScrollShadow, Spinner, useDisclosure } from '@nextui-org/react';
import { Pet } from '@/entities/Pet';
import { useContext } from 'react';
import { UserContext } from '@/app/ui';
import { AddNewPet } from '@/features/AddNewPet';
import { Login } from '@/features/Login';

export default function MyPets() {
  const { isLoading, user, userPets } = useContext(UserContext);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <main className='h-[calc(100%_-_64px)] flex flex-col'>
      <h1 className='text-center text-6xl font-pacifico mb-10'>My Pets</h1>
      {isLoading ? (
        <Spinner size='lg' />
      ) : (
        <>
          <ScrollShadow
            as={'section'}
            hideScrollBar
            className='max-h-[50dvh] my-auto flex flex-col gap-5 overflow-scroll lg:flex-row lg:flex-wrap'
          >
            {userPets.length > 0 ? (
              userPets.map(({ name, image, birthDate }, i) => (
                <Pet
                  key={name}
                  i={i}
                  name={name}
                  image={image}
                  birthDate={birthDate}
                />
              ))
            ) : (
              <h2 className='h-[50dvh] text-2xl text-center font-pacifico'>
                No pets added yet...
              </h2>
            )}
          </ScrollShadow>
          <AddNewPet
            isOpen={user !== null && isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
          />
          <Login isOpen={user === null && isOpen} onClose={onClose} />
        </>
      )}
    </main>
  );
}
