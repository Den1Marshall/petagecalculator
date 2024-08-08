'use client';
import { Button, Card, CardBody, CardFooter } from '@nextui-org/react';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import { IPet } from './model';
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
    try {
      if (user) {
        setIsDeleting(true);
        await deletePet(user.uid, name, userPets);
        setIsDeleting(false);
      } else {
        setUserPets(userPets.filter((pet) => pet.name !== name));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      isBlurred
      shadow='sm'
      as={'article'}
      className='w-full h-full font-pacifico'
    >
      <CardBody>
        <Button
          isLoading={isDeleting}
          variant='light'
          aria-label='Delete current pet'
          isIconOnly
          onPress={handleDeletePet}
          className='absolute z-10 top-0 right-0'
        >
          <CloseIcon />
        </Button>
        <Image
          quality={100}
          src={image}
          fill
          sizes='100%'
          alt={`Picture of ${name}`}
          className='rounded-t-lg object-cover'
        />
      </CardBody>
      <CardFooter className='flex-col justify-center'>
        <h2 className='text-2xl'>{name}</h2>
        <p className='text-lg'>
          {year} years, {month} months, {day} days old
        </p>
      </CardFooter>
    </Card>
  );
};
