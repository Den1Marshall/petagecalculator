'use client';
import { AddIcon } from '@/shared/ui/AddIcon';
import { Button, DatePicker, Input } from '@nextui-org/react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { FC, useContext } from 'react';
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
    useForm<Inputs>();

  const { isSubmitting, errors } = formState;

  const onSubmit: SubmitHandler<Inputs> = async ({ date, name }) => {
    const pet: IPet = {
      name,
      birthDate: date,
      image: '',
    };

    const sameNamedPet = userPets.find((uPet) => uPet.name === pet.name);

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

  return (
    <>
      <Button
        isIconOnly
        variant='shadow'
        color='primary'
        onPress={onOpen}
        className='m-auto'
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
        className={`max-h-[50%] backdrop-blur-2xl saturate-150 bg-overlay/30 lg:max-h-full ${className}`}
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
