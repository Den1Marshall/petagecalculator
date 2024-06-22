'use client';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { FC, useState } from 'react';

export const SelectTheme: FC = () => {
  const { theme, setTheme } = useTheme();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set([theme ?? 'light'])
  );

  return (
    <article className='flex items-center justify-between'>
      <h2>Select theme</h2>
      <Dropdown>
        <DropdownTrigger>
          <Button disableRipple>{theme}</Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          selectionMode='single'
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) => setSelectedKeys(keys)}
          onAction={(key) => setTheme(key as string)}
        >
          <DropdownItem key='light'>Light</DropdownItem>
          <DropdownItem key='dark'>Dark</DropdownItem>
          <DropdownItem key='system'>System</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </article>
  );
};
