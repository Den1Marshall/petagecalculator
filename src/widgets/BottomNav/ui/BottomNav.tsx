'use client';
import { FC } from 'react';
import { BottomNavLink } from './BottomNavLink/BottomNavLink';
import { usePathname } from 'next/navigation';
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { HomeIcon } from './icons/HomeIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { UserIcon } from './icons/UserIcon';

export const BottomNav: FC = () => {
  const pathname = usePathname();

  return (
    <Navbar maxWidth='full' className='fixed bottom-0 pb-safe top-[unset]'>
      <NavbarContent justify='center' className='w-full items-end'>
        <NavbarItem className='w-full'>
          <BottomNavLink href='/' pathname={pathname}>
            <HomeIcon />
            Home
          </BottomNavLink>
        </NavbarItem>

        <NavbarItem className='w-full'>
          <BottomNavLink href='/my-pets' pathname={pathname}>
            <UserIcon />
            My Pets
          </BottomNavLink>
        </NavbarItem>

        <NavbarItem className='w-full'>
          <BottomNavLink href='/settings' pathname={pathname}>
            <SettingsIcon />
            Settings
          </BottomNavLink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
