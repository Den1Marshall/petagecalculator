'use client';
import { Spinner, useDisclosure } from '@nextui-org/react';
import { IPet, Pet } from '@/entities/Pet';
import { useContext, useState } from 'react';
import { UserContext } from '@/app/ui';
import { AddNewPet } from '@/features/AddNewPet';
import { Login } from '@/features/Login';
import { AnimatePresence, Reorder } from 'framer-motion';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/shared/config/firebase';
import { useMediaQuery } from 'usehooks-ts';
import { EditPet } from '@/features/EditPet';

export default function MyPets() {
  const { isLoading, user, userPets, setUserPets } = useContext(UserContext);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure({
    onClose: () => setEditPet(undefined),
  });

  const [editPet, setEditPet] = useState<IPet | undefined>(undefined);

  const { isOpen: isEditPetOpen, onClose: onEditPetClose } = useDisclosure({
    isOpen: editPet !== undefined,
    onClose: () => setEditPet(undefined),
  });

  const openEditPet = (pet: IPet) => {
    setEditPet(pet);
  };

  const handleReorder = async (newOrder: IPet[]) => {
    try {
      if (user) {
        const docRef = doc(db, 'users', user.uid);

        await setDoc(
          docRef,
          { pets: JSON.stringify(newOrder) },
          { merge: true }
        );
      } else {
        setUserPets(newOrder);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [overflow, setOverflow] = useState<
    'overflow-scroll' | 'overflow-hidden'
  >('overflow-scroll');

  const lg = useMediaQuery('(min-width: 1024px)');

  const drag = userPets.length > 1 ? (lg ? 'x' : 'y') : false;

  return (
    <main className='relative h-[calc(100%_-_64px)] flex flex-col'>
      {isLoading ? (
        <Spinner
          size='lg'
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      ) : (
        <>
          <h1 className='max-lg:mb-10 text-center text-6xl font-pacifico'>
            My Pets
          </h1>
          <Reorder.Group
            axis={drag || undefined}
            values={userPets}
            onReorder={handleReorder}
            layoutScroll
            className={`max-lg:pb-10 flex flex-col items-center gap-10 ${overflow} lg:my-auto lg:flex-row`}
          >
            <AnimatePresence initial={false} mode='popLayout'>
              {userPets.map((pet) => (
                <Reorder.Item
                  drag={drag}
                  dragTransition={{ bounceDamping: 50, bounceStiffness: 500 }}
                  key={pet.uuid}
                  value={pet}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  onDragStart={(e) => {
                    if (overflow === 'overflow-scroll') {
                      e.preventDefault();
                      setOverflow('overflow-hidden');
                    }
                  }}
                  onDragEnd={() => {
                    setOverflow('overflow-scroll');
                  }}
                  className={`min-w-[80%] aspect-square ${
                    drag && 'cursor-grab'
                  } lg:min-w-[33.333333%]`}
                >
                  <Pet
                    openEditPet={openEditPet}
                    openAddNewPet={onOpen}
                    uuid={pet.uuid}
                    name={pet.name}
                    image={pet.image}
                    birthDate={pet.birthDate}
                  />
                </Reorder.Item>
              ))}
            </AnimatePresence>
            <AddNewPet
              isOpen={user !== null && isOpen}
              onOpen={onOpen}
              onClose={onClose}
              onOpenChange={onOpenChange}
              className='min-h-10 lg:mx-auto'
            />
            <EditPet
              pet={editPet}
              isOpen={user !== null && isEditPetOpen}
              onClose={onEditPetClose}
            />
          </Reorder.Group>
          {userPets.length < 1 && (
            <h2 className='w-full h-[50dvh] text-2xl text-center font-pacifico'>
              No pets added yet...
            </h2>
          )}
          <Login
            isOpen={
              (user === null && isOpen) || (user === null && isEditPetOpen)
            }
            onClose={onClose}
          />
        </>
      )}
    </main>
  );
}
