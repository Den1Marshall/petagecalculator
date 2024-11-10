'use client';
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { FC, useContext, useEffect, useRef } from 'react';
import {
  CalendarDate,
  getLocalTimeZone,
  today as dateToday,
} from '@internationalized/date';
import { UserContext } from '@/app/ui';
import { IPet } from '@/entities/Pet';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/shared/config/firebase';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Variants } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';
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
        const firebaseError = error as FirebaseError;

        if (firebaseError.code) {
          setError('root', { type: 'custom', message: firebaseError.code });
        } else {
          console.log(error);
        }
      }
    }
  };

  const today = dateToday(getLocalTimeZone());

  const lg = useMediaQuery('(min-width: 1024px)');

  const variants: Variants = {
    enter: {
      y: lg ? undefined : '0%',
      x: lg ? '0%' : undefined,
    },
    exit: {
      y: lg ? undefined : '50%',
      x: lg ? '-100%' : undefined,
    },
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Modal
      hideCloseButton
      backdrop='transparent'
      isDismissable
      size='full'
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      motionProps={{
        variants,
        drag: !lg && 'y',
        dragConstraints: { top: -0 },
        dragElastic: 0.05,
        dragSnapToOrigin: true,
        dragTransition: { bounceStiffness: 500, bounceDamping: 50 },
        onDragEnd: (_e, info) => {
          if (
            info.offset.y >= window.innerHeight / 4 ||
            info.velocity.y >= 250
          ) {
            onClose();
          }
        },
      }}
      className='max-lg:max-h-[50%] backdrop-blur-2xl saturate-150 bg-overlay/30 overflow-y-scroll'
      classNames={{ wrapper: 'lg:max-w-[25%]' }}
    >
      <ModalContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='h-full flex flex-col'
        >
          <ModalHeader>Edit your pet</ModalHeader>
          <ModalBody>
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
                            type: 'spring',
                            duration: 0.5,
                            bounce: 0.15,
                          },
                        },
                        exit: {
                          opacity: 0,
                          transform: 'scale(0)',
                          transition: {
                            type: 'spring',
                            duration: 0.5,
                            bounce: 0,
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
          </ModalBody>
          <ModalFooter className='mb-safe'>
            <Button
              type='submit'
              isLoading={isSubmitting}
              fullWidth
              color='primary'
            >
              Edit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
