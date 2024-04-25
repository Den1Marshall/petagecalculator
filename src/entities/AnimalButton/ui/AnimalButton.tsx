'use client';
import { MotionButton } from '@/shared/ui/MotionButton';
import { useAnimationControls } from 'framer-motion';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { FC } from 'react';

interface AnimalButtonProps {
  src: string | StaticImport;
  name: string;
  isHuman?: boolean;
  className?: string;
  openModal?: () => void;
}

export const AnimalButton: FC<AnimalButtonProps> = ({
  src,
  name,
  isHuman,
  openModal,
  className,
}) => {
  const controls = useAnimationControls();

  return (
    <MotionButton
      onPress={openModal}
      onPressStart={() => controls.start({ x: isHuman ? [10, -10, 0] : 0 })}
      animate={controls}
      whileTap={{ scale: isHuman ? 1 : 0.85 }}
      transition={{
        type: 'spring',
        duration: isHuman ? 0.5 : 0.3,
        bounce: isHuman ? 0.9 : 0,
      }}
      className={({ isFocusVisible }) =>
        `bg-white rounded-full max-w-[200px] h-auto ${
          !isFocusVisible && 'outline-none'
        } ${className}`
      }
    >
      <Image quality={100} priority src={src} alt={`${name} icon`} />
    </MotionButton>
  );
};
