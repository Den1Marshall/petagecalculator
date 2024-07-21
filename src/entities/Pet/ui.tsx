'use client';
import { Button, Card, CardFooter } from '@nextui-org/react';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import { IPet } from './model';
import cat from '@/../public/images/animals/cat.png';
import { getLocalTimeZone, now } from '@internationalized/date';
import { UserContext } from '@/app/ui';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/shared/config/firebase';
import { CloseIcon } from '@/shared/ui/CloseIcon';
import { deletePet } from './api';

interface PetProps extends IPet {
  i: number;
}

export const Pet: FC<PetProps> = ({ image, name, birthDate, i }) => {
  const timeNow = now(getLocalTimeZone());
  const { user, userPets } = useContext(UserContext);

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
    }
  };

  return (
    <Card
      isBlurred
      shadow='none'
      as={'article'}
      className='relative min-h-full flex flex-col items-center justify-center font-pacifico lg:basis-[calc(50%_-_20px)]'
    >
      {user && (
        <Button
          isLoading={isDeleting}
          variant='light'
          isIconOnly
          onPress={handleDeletePet}
          className='absolute top-0 right-0'
        >
          <CloseIcon />
        </Button>
      )}
      <Image
        priority={i === 0}
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
