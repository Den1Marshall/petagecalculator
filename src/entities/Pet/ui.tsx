'use client';
import { Button, Card, CardFooter } from '@nextui-org/react';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import { IPet } from './model';
import cat from '@/../public/images/animals/cat.png';
import { getLocalTimeZone, now } from '@internationalized/date';
import { UserContext } from '@/app/ui';
import { deletePet } from './api';
import { CloseIcon } from '@/shared/ui/CloseIcon';

export const Pet: FC<IPet> = ({ image, name, birthDate }) => {
  const timeNow = now(getLocalTimeZone());
  const { user, userPets, setUserPets } = useContext(UserContext);

  const [isDeleting, setIsDeleting] = useState(false);

  const { year: nowYear, month: nowMonth, day: nowDay } = timeNow;

  const year = Math.abs(nowYear - birthDate.year);
  const month = Math.abs(nowMonth - birthDate.month);
  const day = Math.abs(nowDay - birthDate.day);

  const handleDeletePet = async () => {
    if (user) {
      setIsDeleting(true);
      await deletePet(user.uid, name, userPets);
      setIsDeleting(false);
    } else {
      setUserPets(userPets.filter((pet) => pet.name !== name));
    }
  };

  return (
    <Card
      isBlurred
      shadow='sm'
      as={'article'}
      className='size-full flex flex-col items-center justify-center font-pacifico'
    >
      <Button
        isLoading={isDeleting}
        variant='light'
        isIconOnly
        onPress={handleDeletePet}
        className='absolute top-0 right-0'
      >
        <CloseIcon />
      </Button>
      <Image
        quality={100}
        src={image || cat}
        alt={`Picture of ${name}`}
        className='max-w-full h-auto rounded-t-lg'
      />
      <CardFooter className='flex-col justify-center'>
        <h2 className='text-2xl'>{name}</h2>
        <p className='text-lg'>
          {year} years, {month} months, {day} days old
        </p>
      </CardFooter>
    </Card>
  );
};
