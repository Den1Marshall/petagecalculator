import { Spinner } from '@heroui/react';
import { FC } from 'react';

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <Spinner
      size='lg'
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
    />
  );
};
