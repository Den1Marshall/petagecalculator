'use client';
import { Button } from '@nextui-org/react';
import { useAnimationControls } from 'framer-motion';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { FC } from 'react';
import { motion } from 'framer-motion';

interface AnimalButtonProps {
  src: string | StaticImport;
  name: string;
  isHuman?: boolean;
  openModal?: () => void;
}

export const AnimalButton: FC<AnimalButtonProps> = ({
  src,
  name,
  isHuman,
  openModal,
}) => {
  const controls = useAnimationControls();

  return (
    <motion.span
      animate={controls}
      transition={{
        type: 'spring',
        duration: isHuman ? 0.5 : 0.3,
        bounce: isHuman ? 0.95 : 0,
      }}
    >
      <Button
        variant='shadow'
        isIconOnly
        aria-label={`Current animal is a ${name}. Press to change it.`}
        disableAnimation={isHuman}
        radius='full'
        onPress={openModal}
        onPressStart={() =>
          controls.start({
            transform: isHuman
              ? ['translateX(10px)', 'translateX(0px)']
              : 'translateX(0px)',
          })
        }
        className='bg-white flex items-center justify-center w-full max-w-[180px] h-auto'
      >
        <Image quality={100} priority src={src} alt={`${name} icon`} />
      </Button>
    </motion.span>
  );
};
