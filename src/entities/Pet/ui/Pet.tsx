'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import { IPet } from '../model/IPet';
import { getLocalTimeZone, now } from '@internationalized/date';
import { UserContext } from '@/app/model';
import { TrashIcon } from './TrashIcon';
import { EditIcon } from './EditIcon';
import { EllipsisHorizontalIcon } from './EllipsisHorizontalIcon';
import { AddIcon } from '@/shared/ui/AddIcon';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/shared/config';
import { deleteUserPetImage } from '@/shared/api';
import { FirebaseError } from 'firebase/app';
import { isImageLocal } from '@/shared/lib';
import { Variants } from 'motion/react';
import { defaultTransition } from '@/shared/ui';

interface PetProps extends IPet {
  openAddNewPet: () => void;
  openEditPet: (pet: IPet) => void;
}

export const Pet: FC<PetProps> = ({
  openEditPet,
  openAddNewPet,
  uuid,
  name,
  birthDate,
  image,
}) => {
  const timeNow = now(getLocalTimeZone());
  const { user, userPets, setUserPets } = useContext(UserContext);

  const {
    isOpen: isMenuOpen,
    onOpenChange: onMenuOpenChange,
    onOpen,
  } = useDisclosure();

  const [isDeleting, setIsDeleting] = useState(false);

  const { year: nowYear, month: nowMonth, day: nowDay } = timeNow;

  const year = Math.abs(nowYear - birthDate.year);
  const month = Math.abs(nowMonth - birthDate.month);
  const day = Math.abs(nowDay - birthDate.day);

  const handleDeletePet = async () => {
    try {
      if (user) {
        setIsDeleting(true);

        if (!isImageLocal(image)) {
          await deleteUserPetImage(user.uid, uuid);
        }

        const filteredArr = userPets.filter((uPet) => uPet.uuid !== uuid);

        const docRef = doc(db, 'users', user.uid);

        await setDoc(
          docRef,
          { pets: JSON.stringify(filteredArr) },
          { merge: true }
        );
      } else {
        setUserPets(userPets.filter((pet) => pet.uuid !== uuid));
      }
    } catch (error) {
      error instanceof FirebaseError
        ? alert(error.code) // TODO: use nextui alert, when released
        : alert('Something has went wrong');
    } finally {
      setIsDeleting(false);
    }
  };

  const dropdownVariants: Variants = {
    enter: {
      transform: 'scale(1)',
      opacity: 1,
      transition: { ...defaultTransition, bounce: 0.2 },
    },
    exit: {
      transform: 'scale(0.8)',
      opacity: 0,
      transition: defaultTransition,
    },
  };

  return (
    <Card
      isBlurred
      shadow='sm'
      as={'article'}
      onContextMenu={(e) => {
        e.preventDefault();
        onOpen();
      }}
      className='w-full h-full font-pacifico'
    >
      <CardBody>
        <Dropdown
          motionProps={{ variants: dropdownVariants }}
          isOpen={isMenuOpen}
          onOpenChange={onMenuOpenChange}
        >
          <DropdownTrigger>
            <Button
              aria-label='open menu'
              size='sm'
              isIconOnly
              className='absolute z-10 top-1 right-1 bg-overlay/30 saturate-150 backdrop-blur-sm'
            >
              <EllipsisHorizontalIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            color='primary'
            onAction={(key) => {
              switch (key) {
                case 'add':
                  openAddNewPet();
                  break;
                case 'edit':
                  openEditPet({ uuid, name, birthDate, image });
                  break;
                case 'delete':
                  handleDeletePet();
                  break;
              }
            }}
          >
            <DropdownItem key={'add'} showDivider startContent={<AddIcon />}>
              Add new pet
            </DropdownItem>
            <DropdownItem key={'edit'} showDivider startContent={<EditIcon />}>
              Edit pet
            </DropdownItem>
            <DropdownItem
              key={'delete'}
              color='danger'
              startContent={<TrashIcon />}
              endContent={isDeleting && <Spinner />}
              className='text-danger'
            >
              Delete pet
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Image
          priority
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
