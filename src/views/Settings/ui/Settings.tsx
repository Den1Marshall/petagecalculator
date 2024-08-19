'use client';
import { SelectTheme } from '@/features/SelectTheme';
import { Logout } from '@/features/Logout';
import { DeleteAccount } from '@/features/DeleteAccount';
import { UpdateProfile } from '@/widgets/UpdateProfile';
import { ButtonGroup, Divider, Spinner } from '@nextui-org/react';
import { useContext } from 'react';
import { UserContext } from '@/app/ui';

export default function Settings() {
  const { isLoading } = useContext(UserContext);

  return (
    <main className='relative h-[calc(100%_-_64px)] flex flex-col overflow-y-scroll'>
      <h1 className='text-6xl text-center font-pacifico'>Settings</h1>
      {isLoading ? (
        <Spinner
          size='lg'
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      ) : (
        <div className='flex flex-col gap-10 mt-10'>
          <SelectTheme />
          <Divider />
          <UpdateProfile />
          <Divider />
          <ButtonGroup>
            <Logout />
            <DeleteAccount />
          </ButtonGroup>
        </div>
      )}
    </main>
  );
}
