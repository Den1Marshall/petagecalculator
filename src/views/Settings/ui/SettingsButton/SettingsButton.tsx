'use client';
import { FC, PropsWithChildren } from 'react';
import { Button, ButtonProps, Input } from '@heroui/react';

interface SettingsButtonProps
  extends PropsWithChildren,
    Pick<ButtonProps, 'color'> {
  isDisabled?: boolean;
  value?: string;
  onPress: () => void;
}

export const SettingsButton: FC<SettingsButtonProps> = ({
  color,
  children,
  isDisabled,
  value,
  onPress,
}) => {
  return (
    <Button
      isDisabled={isDisabled}
      onPress={onPress}
      variant='light'
      // endContent={}
      color={color}
      disableAnimation
      fullWidth
      className='flex justify-between items-center'
    >
      {children}

      {value && (
        <Input
          as={'span'}
          value={value}
          isReadOnly
          isDisabled
          className='items-end opacity-100'
          classNames={{ inputWrapper: '!bg-transparent shadow-none' }}
        />
      )}
    </Button>
  );
};
