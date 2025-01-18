'use client';
import { Button } from '@heroui/react';
import { AnimatePresence, useAnimationControls } from 'motion/react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { FC } from 'react';
import { motion } from 'motion/react';
import { defaultTransition } from '@/shared/ui';

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
        ...defaultTransition,
        visualDuration: isHuman ? 0.035 : 0.25,
        bounce: isHuman ? 0.999 : 0,
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
        <AnimatePresence mode='popLayout' initial={false}>
          <motion.span
            key={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
          >
            <Image quality={100} priority src={src} alt={`${name} icon`} />
          </motion.span>
        </AnimatePresence>
      </Button>
    </motion.span>
  );
};
