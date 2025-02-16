'use client';

import { AddIcon } from '@/shared/ui/AddIcon';
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@heroui/react';
import { FC, useContext, useRef } from 'react';
import { getLocalTimeZone, today as dateToday } from '@internationalized/date';
import { UserContext } from '@/app/model';
import { IPet } from '@/entities/Pet';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/shared/config';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { motion } from 'motion/react';
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
import { uploadUserPetImage } from '@/shared/api';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseError } from 'firebase/app';
import { defaultTransition, Sheet } from '@/shared/ui';

interface AddNewPetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  className?: string;
}

export const AddNewPet: FC<AddNewPetProps> = ({
  isOpen,
  onOpen,
  onClose,
  onOpenChange,
  className,
}) => {
  const { user, userPets } = useContext(UserContext);

  const { control, formState, handleSubmit, reset, setError, setValue } =
    useForm<IPet>({ defaultValues: { image: cat.src } });

  const { isSubmitting, errors } = formState;

  const onSubmit: SubmitHandler<IPet> = async ({ birthDate, name, image }) => {
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
        const pet: IPet = {
          uuid: uuidv4(),
          name,
          birthDate,
          image,
        };

        const userImage = inputRef.current?.files?.item(0) ?? null;

        if (userImage) {
          pet.image = await uploadUserPetImage(user.uid, pet.uuid, userImage);
        }

        const docRef = doc(db, 'users', user.uid);

        await setDoc(
          docRef,
          { pets: JSON.stringify([...userPets, pet]) },
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
    <>
      <motion.span
        layout
        className={`${
          userPets.length === 0 ? 'mx-auto' : ''
        } w-full max-w-80 aspect-square flex items-center justify-center`}
      >
        <Button
          isIconOnly
          aria-label='Add new pet'
          variant='shadow'
          color='primary'
          onPress={onOpen}
          className={className}
        >
          <AddIcon />
        </Button>
      </motion.span>

      <Sheet isOpen={isOpen} onOpenChange={onOpenChange} onClose={reset}>
        <DrawerContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerHeader>Tell us more about your pet</DrawerHeader>

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
                    isInvalid={Boolean(errors.name?.message)}
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
                    isInvalid={Boolean(errors.birthDate?.message)}
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
                    defaultSelectedKeys={[cat.src]}
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
                Add
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Sheet>
    </>
  );
};
