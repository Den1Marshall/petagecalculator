import { Spinner } from '@nextui-org/react';
import { FC } from 'react';

export const Loading: FC = () => {
  return (
    <Spinner
      size='lg'
      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    />
  );
};
