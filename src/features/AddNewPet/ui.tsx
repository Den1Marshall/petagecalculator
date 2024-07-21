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

interface AddNewPetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
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
}) => {
  const { user, userPets } = useContext(UserContext);

  const { control, formState, handleSubmit, reset, setError } =
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

  return (
    <>
      <Button
        variant='shadow'
        color='primary'
        onPress={onOpen}
        className='m-auto'
      >
        <AddIcon />
        Add new pet
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
          variants: {
            enter: {
              transform: 'translateY(0%)',
            },
            exit: {
              transform: 'translateY(100%)',
            },
          },
        }}
        className='max-h-[50%] backdrop-blur-2xl saturate-150 bg-overlay/30'
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
