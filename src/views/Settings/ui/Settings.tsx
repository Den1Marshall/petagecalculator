'use client';
import { SelectTheme } from '@/features/SelectTheme';
import { Logout } from '@/features/Logout';
import { DeleteAccount } from '@/features/DeleteAccount';
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';
import { useContext, useState } from 'react';
import { UserContext } from '@/app/ui';
import { ChangeEmail } from '@/features/ChangeEmail';
import { ChangePassword } from '@/features/ChangePassword';
import { Login } from '@/features/Login';
import { Loading } from '@/shared/ui';

export default function Settings() {
  const { isLoading, user } = useContext(UserContext);

  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <main className='relative h-[calc(100%_-_64px)] flex flex-col overflow-y-scroll'>
      <h1 className='text-6xl text-center font-pacifico max-lg:mb-10'>
        Settings
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Listbox
            itemClasses={{ title: 'text-medium' }}
            variant='light'
            onAction={(key) => {
              if (!user && key !== 'selectTheme') {
                setIsLoginOpen(true);
                return;
              }

              switch (key) {
                case 'changeEmail':
                  setIsChangeEmailOpen(true);
                  break;

                case 'changePassword':
                  setIsChangePasswordOpen(true);
                  break;

                case 'logout':
                  setIsLogoutOpen(true);
                  break;

                case 'deleteAccount':
                  setIsDeleteAccountOpen(true);
                  break;

                default:
                  break;
              }
            }}
          >
            <ListboxSection title={'Preferences'} showDivider>
              <ListboxItem
                color='primary'
                key={'selectTheme'}
                textValue='Select theme'
              >
                <div className='flex items-center justify-between'>
                  <h2>Select theme</h2>
                  <SelectTheme />
                </div>
              </ListboxItem>
            </ListboxSection>
            <ListboxSection title={'Account'} showDivider>
              <ListboxItem
                color='primary'
                key={'changeEmail'}
                textValue='Email address'
              >
                <div className='flex justify-between'>
                  <h2>Email address</h2>
                  <p>{user?.email}</p>
                </div>
              </ListboxItem>
              <ListboxItem
                color='primary'
                key={'changePassword'}
                textValue='Password'
              >
                Password
              </ListboxItem>
            </ListboxSection>
            <ListboxSection title={'Danger zone'} showDivider>
              <ListboxItem key={'logout'} color='danger' textValue='Logout'>
                Logout
              </ListboxItem>
              <ListboxItem
                key={'deleteAccount'}
                color='danger'
                textValue='Delete account'
              >
                Delete account
              </ListboxItem>
            </ListboxSection>
          </Listbox>
          <ChangeEmail
            isOpen={isChangeEmailOpen}
            setIsOpen={setIsChangeEmailOpen}
          />
          <ChangePassword
            isOpen={isChangePasswordOpen}
            setIsOpen={setIsChangePasswordOpen}
          />
          <Logout isOpen={isLogoutOpen} setIsOpen={setIsLogoutOpen} />
          <DeleteAccount
            isOpen={isDeleteAccountOpen}
            setIsOpen={setIsDeleteAccountOpen}
          />
          <Login
            isOpen={!user && isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
          />
        </>
      )}
    </main>
  );
}
