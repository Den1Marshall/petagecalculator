import { FC } from 'react';

interface AnimalAgeProps {
  age?: [string, string];
  humanAge?: number;
}

export const AnimalAge: FC<AnimalAgeProps> = ({ age, humanAge }) => {
  return (
    <p className='text-4xl'>
      <span className='text-5xl'>{age?.[0] ?? humanAge}</span>
      <br />
      {age?.[1] ?? 'years'}
    </p>
  );
};
