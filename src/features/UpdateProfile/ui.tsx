'use client';
import { UserContext } from '@/app/ui';
import { Button, Input } from '@nextui-org/react';
import { FC, useContext, useEffect, useState } from 'react';
import {
  updatePassword,
  updateProfile,
  verifyBeforeUpdateEmail,
} from 'firebase/auth';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { auth } from '@/shared/config/firebase';
import { reauthenticateUser } from '@/shared/api';
import { FirebaseError } from 'firebase/app';
import { EyeIcon, EyeSlashIcon } from '@/shared/ui';

interface Inputs {
  name: string;
  email: string;
  password: string;
  newPassword: string;
}

export const UpdateProfile: FC = () => {
  const { user } = useContext(UserContext);

  const { control, formState, handleSubmit, reset, resetField, setError } =
    useForm<Inputs>({
      defaultValues: async () => {
        await auth.authStateReady();

        return {
          name: auth.currentUser?.displayName ?? '',
          email: auth.currentUser?.email ?? '',
          password: '',
          newPassword: '',
        };
      },
    });

  const { isSubmitting, errors, isDirty, dirtyFields } = formState;

  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    email,
    password,
    newPassword,
  }) => {
    if (user) {
      try {
        if (dirtyFields.email) {
          if (!user.email) {
            setError('root', { type: 'custom', message: 'No user email' });
            return;
          }

          await reauthenticateUser(user, user.email, password);
          await verifyBeforeUpdateEmail(user, email);

          alert(
            `A verification email has been sent to your new email address ${email}. Please verify it to login with the new email.`
          );
        }

        if (dirtyFields.newPassword) {
          await reauthenticateUser(user, email, password);
          await updatePassword(user, newPassword);

          alert('Password has been updated.');
        }

        await updateProfile(user, { displayName: name });

        reset({ name, email, password: '', newPassword: '' });
      } catch (error) {
        const firebaseError = error as FirebaseError;
        const defaultError = error as Error;

        reset();

        setError('root', {
          type: 'custom',
          message: firebaseError.message ?? defaultError.message,
        });
      }
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      reset({
        name: '',
        email: '',
        password: '',
        newPassword: '',
      });
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10'>
      <Controller
        control={control}
        name='name'
        rules={{
          minLength: 1,
          maxLength: 20,
        }}
        render={({ field }) => (
          <Input
            isClearable={dirtyFields.name}
            onClear={dirtyFields.name ? () => resetField('name') : undefined}
            label='Username'
            labelPlacement='outside-left'
            variant='underlined'
            errorMessage={errors.name?.message}
            isInvalid={Boolean(errors.name?.message)}
            isDisabled={!user}
            className='justify-between'
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name='email'
        rules={{ required: 'This field is required', minLength: 1 }}
        render={({ field }) => (
          <Input
            isClearable={dirtyFields.email}
            onClear={dirtyFields.email ? () => resetField('email') : undefined}
            type='email'
            label='Email'
            labelPlacement='outside-left'
            variant='underlined'
            errorMessage={errors.email?.message}
            isInvalid={Boolean(errors.email?.message)}
            isDisabled={!user}
            className='justify-between'
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name='newPassword'
        rules={{ minLength: 1 }}
        render={({ field }) => (
          <Input
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                aria-label='toggle password visibility'
              >
                {isNewPasswordVisible ? (
                  <EyeSlashIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={isNewPasswordVisible ? 'text' : 'password'}
            label='New password'
            labelPlacement='outside-left'
            variant='underlined'
            errorMessage={errors.newPassword?.message}
            isInvalid={Boolean(errors.newPassword?.message)}
            isDisabled={!user}
            className='justify-between'
            {...field}
          />
        )}
      />
      {(dirtyFields.email || dirtyFields.newPassword) && (
        <Controller
          control={control}
          name='password'
          rules={{ required: 'This field is required', minLength: 1 }}
          render={({ field }) => (
            <Input
              isRequired
              endContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  aria-label='toggle password visibility'
                >
                  {isPasswordVisible ? (
                    <EyeSlashIcon className='text-2xl text-default-400 pointer-events-none' />
                  ) : (
                    <EyeIcon className='text-2xl text-default-400 pointer-events-none' />
                  )}
                </button>
              }
              type={isPasswordVisible ? 'text' : 'password'}
              label='Password'
              labelPlacement='outside'
              variant='underlined'
              errorMessage={errors.password?.message}
              isInvalid={Boolean(errors.password?.message)}
              isDisabled={!user}
              className='justify-between'
              {...field}
            />
          )}
        />
      )}
      <Button
        color='primary'
        type='submit'
        isLoading={isSubmitting}
        isDisabled={!user || !isDirty}
      >
        Update profile
      </Button>
      {errors.root && <p className='text-danger'>{errors.root.message}</p>}
    </form>
  );
};
