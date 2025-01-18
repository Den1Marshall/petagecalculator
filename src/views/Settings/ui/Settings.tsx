'use client';
import { SelectTheme } from '@/features/SelectTheme';
import { Logout } from './Logout/Logout';
import { DeleteAccount } from './DeleteAccount/DeleteAccount';
import { useContext, useState } from 'react';
import { UserContext } from '@/app/model';
import { ChangeEmail } from './ChangeEmail/ChangeEmail';
import { ChangePassword } from './ChangePassword/ChangePassword';
import { Login } from '@/features/Login';
import { LoadingSpinner } from '@/shared/ui';
import { SettingsButton } from './SettingsButton/SettingsButton';
import { Button, Card, CardBody, Divider } from '@heroui/react';

export default function Settings() {
  const { isLoading, user } = useContext(UserContext);

  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const isGoogleProvider = user?.providerData[0].providerId === 'google.com';

  if (isLoading) return <LoadingSpinner />;

  return (
    <main className='relative h-[calc(100%_-_64px)] flex flex-col gap-5 overflow-y-scroll'>
      <h1 className='text-6xl text-center font-pacifico mb-5'>Settings</h1>

      <Card shadow='sm' isBlurred as='article'>
        <CardBody className='gap-2.5'>
          <div className='flex items-center justify-between'>
            <Button
              fullWidth
              disableAnimation
              className='flex items-center justify-between bg-transparent'
              as={'div'}
            >
              Select theme
              <SelectTheme />
            </Button>
            {/* TODO: refactor */}
          </div>

          <Divider />

          <SettingsButton
            isDisabled={isGoogleProvider}
            onPress={() => setIsChangeEmailOpen(true)}
            value={user?.email ?? ''}
          >
            <ChangeEmail
              isOpen={isChangeEmailOpen}
              setIsOpen={setIsChangeEmailOpen}
            />
          </SettingsButton>

          <SettingsButton
            isDisabled={isGoogleProvider}
            onPress={() => setIsChangePasswordOpen(true)}
            value='******'
          >
            <ChangePassword
              isOpen={isChangePasswordOpen}
              setIsOpen={setIsChangePasswordOpen}
            />
          </SettingsButton>

          <Divider />

          <SettingsButton onPress={() => setIsLogoutOpen(true)}>
            <Logout isOpen={isLogoutOpen} setIsOpen={setIsLogoutOpen} />
          </SettingsButton>

          <SettingsButton onPress={() => setIsDeleteAccountOpen(true)}>
            <DeleteAccount
              isOpen={isDeleteAccountOpen}
              setIsOpen={setIsDeleteAccountOpen}
            />
          </SettingsButton>
        </CardBody>
      </Card>

      <Login
        isOpen={!user && isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </main>
  );
}
