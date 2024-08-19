'use client';
import { AddIcon } from '@/shared/ui/AddIcon';
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { FC, useContext, useRef } from 'react';
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
import { uploadUserPetImage } from '@/shared/api';

interface AddNewPetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  className?: string;
}

interface Inputs {
  name: string;
  date: CalendarDate;
  image: string;
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
    useForm<Inputs>({ defaultValues: { image: cat.src } });

  const { isSubmitting, errors } = formState;

  const onSubmit: SubmitHandler<Inputs> = async ({ date, name, image }) => {
    const sameNamedPet = userPets.find((uPet) => uPet.name === name);

    if (date.compare(today) > 0) {
      setError(
        'date',
        { type: 'custom', message: 'Your pet can not be younger than today' },
        { shouldFocus: true }
      );
      return;
    }

    if (sameNamedPet) {
      setError(
        'name',
        { type: 'custom', message: 'This pet already exists' },
        { shouldFocus: true }
      );
      return;
    }

    if (user && !sameNamedPet) {
      try {
        const pet: IPet = {
          name,
          birthDate: date,
          image,
        };

        const userImage = inputRef.current?.files?.item(0) ?? null;

        if (userImage) {
          pet.image = await uploadUserPetImage(user.uid, name, userImage);
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
        console.log(error);
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
      y: lg ? undefined : '100%',
      x: lg ? '-100%' : undefined,
    },
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
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
      <Modal
        hideCloseButton
        backdrop='transparent'
        isDismissable
        size='full'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={reset}
        motionProps={{
          variants,
          drag: !lg && 'y',
          dragConstraints: { top: -0 },
          dragElastic: 0.05,
          dragSnapToOrigin: true,
          dragTransition: { bounceStiffness: 500, bounceDamping: 50 },
          onDragEnd: (_e, info) => {
            if (
              info.offset.y >= window.innerHeight / 2 ||
              info.velocity.y >= 250
            ) {
              onClose();
            }
          },
        }}
        className='max-h-[50%] backdrop-blur-2xl saturate-150 bg-overlay/30 overflow-y-scroll lg:max-h-full'
        classNames={{ wrapper: 'lg:max-w-[25%]' }}
      >
        <ModalContent as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Tell us more about your pet</ModalHeader>
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
                  isInvalid={Boolean(errors.name?.message)}
                  errorMessage={errors.name?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name='date'
              rules={{ required: 'This field is required' }}
              control={control}
              render={({ field }) => (
                <DatePicker
                  isRequired
                  variant='bordered'
                  label={'Birth date'}
                  maxValue={today}
                  isInvalid={Boolean(errors.date?.message)}
                  errorMessage={errors.date?.message}
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
          </ModalBody>
          <ModalFooter className='mb-safe'>
            <Button
              type='submit'
              isLoading={isSubmitting}
              fullWidth
              color='primary'
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
