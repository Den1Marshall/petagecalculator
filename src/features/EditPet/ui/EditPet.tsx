'use client';

import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@heroui/react';
import { FC, useContext, useEffect, useRef } from 'react';
import {
  CalendarDate,
  getLocalTimeZone,
  today as dateToday,
} from '@internationalized/date';
import { UserContext } from '@/app/model';
import { IPet } from '@/entities/Pet';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/shared/config';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import cat from '@/../public/images/animals/cat.png';
import dog from '@/../public/images/animals/dog.png';
import hamster from '@/../public/images/animals/hamster.png';
import mouse from '@/../public/images/animals/mouse.png';
import rabbit from '@/../public/images/animals/rabbit.png';
import fox from '@/../public/images/animals/fox.png';
import chick from '@/../public/images/animals/chick.png';
import goat from '@/../public/images/animals/goat.png';
import horse from '@/../public/images/animals/horse.png';
import cow from '@/../public/images/animals/cow.png';
import pig from '@/../public/images/animals/pig.png';
import Image from 'next/image';
import { deleteUserPetImage, uploadUserPetImage } from '@/shared/api';
import { FirebaseError } from 'firebase/app';
import { isImageLocal } from '@/shared/lib';
import { defaultTransition, Sheet } from '@/shared/ui';

interface EditPetProps {
  isOpen: boolean;
  onClose: () => void;
  pet?: IPet;
}

export const EditPet: FC<EditPetProps> = ({ isOpen, onClose, pet }) => {
  const { user, userPets } = useContext(UserContext);

  const { control, formState, handleSubmit, reset, setError, setValue } =
    useForm<IPet>();

  const { isSubmitting, errors, dirtyFields } = formState;

  useEffect(() => {
    if (pet !== undefined) {
      reset({
        name: pet.name,
        birthDate: new CalendarDate(
          pet.birthDate.year,
          pet.birthDate.month,
          pet.birthDate.day
        ),
        image: pet.image,
      });
    }
  }, [pet, reset]);

  const onSubmit: SubmitHandler<IPet> = async ({ name, birthDate, image }) => {
    const editPetIndex =
      pet !== undefined
        ? userPets.findIndex((uPet) => uPet.uuid === pet.uuid)
        : -1;

    if (pet === undefined) {
      setError('root', { type: 'custom', message: 'Pet is undefined' });

      return;
    }

    if (editPetIndex === -1) {
      setError('root', {
        type: 'custom',
        message: 'Can not find pet to edit, try again',
      });

      return;
    }

    if (birthDate.compare(today) > 0) {
      setError(
        'birthDate',
        { type: 'custom', message: 'Your pet can not be younger than today' },
        { shouldFocus: true }
      );

      return;
    }

    if (user) {
      try {
        const updatedPet: IPet = {
          uuid: pet.uuid,
          name,
          birthDate,
          image,
        };

        const userPetImage = inputRef.current?.files?.item(0) ?? null;

        if (userPetImage) {
          updatedPet.image = await uploadUserPetImage(
            user.uid,
            pet.uuid,
            userPetImage
          );
        }

        if (
          dirtyFields.image &&
          !isImageLocal(pet.image) &&
          userPetImage === null
        ) {
          await deleteUserPetImage(user.uid, pet.uuid);
        }

        const docRef = doc(db, 'users', user.uid);

        const updatedUserPets: IPet[] = JSON.parse(JSON.stringify(userPets));
        updatedUserPets.splice(editPetIndex, 1, updatedPet);

        await setDoc(
          docRef,
          { pets: JSON.stringify(updatedUserPets) },
          { merge: true }
        );

        reset();
        onClose();
      } catch (error) {
        if (error instanceof FirebaseError) {
          setError('root', { type: 'custom', message: error.code });
        } else {
          setError('root', {
            type: 'custom',
            message: 'Something went wrong',
          });
        }
      }
    }
  };

  const today = dateToday(getLocalTimeZone());

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerHeader>Edit your pet</DrawerHeader>
          <DrawerBody>
            <Controller
              name='name'
              rules={{
                minLength: 1,
                maxLength: 20,
                required: 'This field is required',
              }}
              control={control}
              render={({ field }) => (
                <Input
                  isRequired
                  isClearable
                  onClear={() => setValue('name', '')}
                  variant='bordered'
                  label={'Name'}
                  isInvalid={errors.name?.message !== undefined}
                  errorMessage={errors.name?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name='birthDate'
              rules={{ required: 'This field is required' }}
              control={control}
              render={({ field }) => (
                <DatePicker
                  isRequired
                  variant='bordered'
                  label={'Birth date'}
                  maxValue={today}
                  isInvalid={errors.birthDate?.message !== undefined}
                  errorMessage={errors.birthDate?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name='image'
              control={control}
              render={({ field }) => (
                <Select
                  defaultSelectedKeys={[pet?.image ?? cat.src]}
                  disallowEmptySelection
                  variant='bordered'
                  label='Select or upload image'
                  popoverProps={{
                    backdrop: 'blur',
                    motionProps: {
                      variants: {
                        enter: {
                          opacity: 1,
                          transform: 'scale(1)',
                          transition: {
                            ...defaultTransition,
                            visualDuration: 0.3,
                            bounce: 0.15,
                          },
                        },
                        exit: {
                          opacity: 0,
                          transform: 'scale(0)',
                          transition: {
                            ...defaultTransition,
                            visualDuration: 0.3,
                          },
                        },
                      },
                    },
                  }}
                  {...field}
                >
                  <SelectItem key={cat.src} textValue='Cat'>
                    <Image
                      src={cat}
                      alt='cat image'
                      className='max-w-[50%] mx-auto'
                    />
                  </SelectItem>
                  <SelectItem key={dog.src} textValue='Dog'>
                    <Image
                      src={dog}
                      alt='dog image'
                      className='max-w-[50%] mx-auto'
                    />
                  </SelectItem>
                  <SelectItem key={hamster.src} textValue='Hamster'>
                    <Image
                      src={hamster}
                      alt='hamster image'
                      className='max-w-[50%] mx-auto'
                    />
                  </SelectItem>
                  <SelectItem key={mouse.src} textValue='Mouse'>
                    <Image
                      src={mouse}
                      alt='mouse image'
                      className='max-w-[50%] mx-auto'
                    />
                  </SelectItem>
                  <SelectItem key={rabbit.src} textValue='Rabbit'>
                    <Image
                      src={rabbit}
                      alt='rabbit image'
                      className='max-w-[50%] mx-auto'
                    />
                  </SelectItem>
                  <SelectItem key={fox.src} textValue='Fox'>
                    <Image
                      src={fox}
                      alt='fox image'
                      className='max-w-[50%] mx-auto'
                    />
                  </SelectItem>
                  <SelectItem key={chick.src} textValue='Chick'>
                    <Image
                      src={chick}
                      alt='chick image'
                      className='max-w-[50%] mx-auto'
                    />
                  </SelectItem>
                  <SelectItem key={goat.src} textValue='Goat'>
                    <Image
                      src={goat}
                      alt='goat image'
                      className='max-w-[50%] mx-auto'
                    />
                  </SelectItem>
                  <SelectItem key={horse.src} textValue='Horse'>
                    <Image
                      src={horse}
                      alt='horse image'
                      className='max-w-[50%] mx-auto'
                    />
                  </SelectItem>
                  <SelectItem key={cow.src} textValue='Cow'>
                    <Image
                      src={cow}
                      alt='cow image'
                      className='max-w-[50%] mx-auto'
                    />
                  </SelectItem>
                  <SelectItem key={pig.src} textValue='Pig'>
                    <Image
                      src={pig}
                      alt='pig image'
                      className='max-w-[50%] mx-auto'
                    />
                  </SelectItem>
                </Select>
              )}
            />

            <input ref={inputRef} type='file' accept='image/*' />

            {errors.root && (
              <p role='alert' className='text-danger'>
                {errors.root?.message}
              </p>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button
              type='submit'
              isLoading={isSubmitting}
              fullWidth
              color='primary'
            >
              Edit
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Sheet>
  );
};
