import { FC } from 'react';

interface EllipsisHorizontalIconProps {
  className?: string;
}

export const EllipsisHorizontalIcon: FC<EllipsisHorizontalIconProps> = ({
  className,
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={`size-6 ${className}`}
    >
      <path
        fillRule='evenodd'
        d='M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z'
        clipRule='evenodd'
      />
    </svg>
  );
};
