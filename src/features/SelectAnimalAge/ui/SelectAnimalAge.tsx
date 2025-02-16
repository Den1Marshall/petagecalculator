'use client';

import { FC } from 'react';
import { Slider } from '@heroui/react';

interface SelectAnimalAgeProps {
  age: number;
  setAge: (value: number) => void;
  maxValue: number;
}

export const SelectAnimalAge: FC<SelectAnimalAgeProps> = ({
  age,
  setAge,
  maxValue,
}) => {
  return (
    <Slider
      aria-label='Animal age'
      color='foreground'
      value={age}
      maxValue={maxValue}
      classNames={{ thumb: 'after:bg-primary' }}
      onChange={(value) => setAge(value as number)}
    />
  );
};
