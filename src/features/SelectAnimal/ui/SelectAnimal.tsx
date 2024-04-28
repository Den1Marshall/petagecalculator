'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { Dialog, Heading, Modal } from 'react-aria-components';
import { useMediaQuery } from 'usehooks-ts';
import { animals } from '../model/animals';
import { Animal } from '../model/types';
import Image from 'next/image';
import { MotionButton } from '@/shared/ui/MotionButton';

const MotionModal = motion(Modal);

interface SelectAnimalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectNewAnimal: (value: Animal) => void;
}

export const SelectAnimal: FC<SelectAnimalProps> = ({
  isOpen,
  setIsOpen,
  selectNewAnimal,
}) => {
  const lg = useMediaQuery('(min-width: 768px)');

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionModal
          isOpen
          onOpenChange={setIsOpen}
          initial={{ x: lg ? '-100%' : '0%', y: lg ? '0%' : '100%' }}
          animate={{ x: '0%', y: '0%' }}
          exit={{ x: lg ? '-100%' : '0%', y: lg ? '0%' : '100%' }}
          transition={{
            type: 'spring',
            duration: 0.5,
            bounce: 0,
            restDelta: 0.0001,
          }}
          drag={!lg && 'y'}
          dragConstraints={{ top: -0 }}
          dragElastic={0.05}
          dragSnapToOrigin
          dragTransition={{
            bounceStiffness: 500,
            bounceDamping: 50,
            restDelta: 0.0001,
          }}
          onDragEnd={(_e, info) => {
            if (
              info.offset.y >= window.innerHeight / 2 ||
              info.velocity.y >= 450
            ) {
              setIsOpen(false);
            }
          }}
          className='fixed z-10 left-0 top-safe w-full h-full bg-white/[.3] dark:bg-black/[.3] backdrop-blur-xl rounded-t-2xl lg:w-3/12 lg:rounded-none lg:overflow-y-auto lg:overscroll-contain'
        >
          <Dialog className='flex flex-col gap-10 p-5 outline-none lg:p-7'>
            <Heading
              slot='title'
              className='text-5xl text-center font-pacifico'
            >
              Select animal
            </Heading>
            <section className='grid grid-cols-3 gap-3 lg:grid-cols-2'>
              {animals.map((animal) => (
                <MotionButton
                  key={animal.name}
                  aria-label={`Select ${animal.name.toLowerCase()} as the current animal`}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', duration: 0.25 }}
                  onTap={() => {
                    selectNewAnimal(animal);
                    !lg && setIsOpen(false);
                  }}
                  className={({ isFocusVisible }) =>
                    `basis-1/3 bg-white/20 rounded-3xl ${
                      !isFocusVisible && 'outline-none'
                    } dark:bg-black/20 lg:basis-1/2`
                  }
                >
                  <Image
                    priority
                    quality={100}
                    src={animal.src}
                    alt={`${animal.name} icon`}
                  />
                </MotionButton>
              ))}
            </section>
          </Dialog>
        </MotionModal>
      )}
    </AnimatePresence>
  );
};
