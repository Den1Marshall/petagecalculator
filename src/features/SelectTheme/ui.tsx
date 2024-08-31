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
import { FC, useEffect, useState } from 'react';

export const SelectTheme: FC = () => {
  const { theme, setTheme } = useTheme();

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set([theme ?? 'light'])
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Dropdown
      closeOnSelect={false}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            transform: 'scale(1)',
            transition: { type: 'spring', duration: 0.5, bounce: 0.2 },
          },
          exit: {
            opacity: 0,
            transform: 'scale(0)',
          },
        },
      }}
    >
      <DropdownTrigger>
        <Button color='primary' className='capitalize'>
          {theme}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectionMode='single'
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys)}
        onAction={(key) => setTheme(key as string)}
      >
        <DropdownItem color='primary' key='light'>
          Light
        </DropdownItem>
        <DropdownItem color='primary' key='dark'>
          Dark
        </DropdownItem>
        <DropdownItem color='primary' key='system'>
          System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};