import { FC } from 'react';
import { Slider, SliderThumb, SliderTrack } from 'react-aria-components';

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
      value={age}
      onChange={setAge}
      maxValue={maxValue}
      className={'w-full max-sm:px-6'}
    >
      <SliderTrack className='relative w-full h-11'>
        <div className='absolute h-1 top-[50%] translate-y-[-50%] w-full rounded-full bg-white' />
        <SliderThumb className='h-6 w-6 top-[50%] rounded-full bg-white' />
      </SliderTrack>
    </Slider>
  );
};
