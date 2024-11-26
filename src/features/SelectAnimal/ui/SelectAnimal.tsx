'use client';
import { MotionProps, Variants } from 'framer-motion';
import { FC } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { animals } from '../model/animals';
import { Animal } from '../model/types';
import Image from 'next/image';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { PressableButton } from '@/shared/ui';

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
  const lg = useMediaQuery('(min-width: 1024px)');

  const variants: Variants = {
    enter: {
      y: lg ? undefined : '0%',
      x: lg ? '0%' : undefined,
    },
    exit: {
      y: lg ? undefined : '100%',
      x: lg ? '-100%' : undefined,
    },
  };

  const motionProps: MotionProps = {
    variants,
    drag: !lg && 'y',
    dragConstraints: { top: -0 },
    dragElastic: 0.05,
    dragSnapToOrigin: true,
    dragTransition: {
      bounceStiffness: 500,
      bounceDamping: 50,
      restDelta: 0.0001,
    },
    onDragEnd: (_e, info) => {
      if (info.offset.y >= window.innerHeight / 2 || info.velocity.y >= 250) {
        setIsOpen(false);
      }
    },
  };

  return (
    <Modal
      hideCloseButton
      backdrop='transparent'
      size={lg ? 'full' : undefined}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      motionProps={motionProps}
      classNames={{
        wrapper: 'top-safe lg:w-1/4',
        base: 'max-lg:w-full max-lg:h-full max-sm:mb-0 max-sm:mx-0 max-lg:pb-0 bg-overlay/30 backdrop-blur-2xl lg:overflow-y-auto lg:overscroll-contain',
      }}
    >
      <ModalContent>
        <ModalHeader className='self-center text-5xl text-center font-pacifico'>
          Select animal
        </ModalHeader>

        <ModalBody className='grid grid-cols-3 gap-3 content-start max-lg:landscape:grid-cols-4 lg:grid-cols-2'>
          {animals.map((animal) => (
            <PressableButton
              key={animal.name}
              aria-label={`Select ${animal.name.toLowerCase()} as the current animal`}
              onPress={() => {
                selectNewAnimal(animal);
                !lg && setIsOpen(false);
              }}
              className={({ isFocusVisible }) =>
                `bg-overlay/20 rounded-2xl ${!isFocusVisible && 'outline-none'}`
              }
            >
              <Image
                priority
                quality={100}
                src={animal.src}
                alt={`${animal.name} icon`}
              />
            </PressableButton>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
