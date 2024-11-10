'use client';
import { CloseIcon } from '@/shared/ui';
import { InfoIcon } from '@/shared/ui';
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Variants } from 'framer-motion';
import { FC } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export const Credits: FC = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const lg = useMediaQuery('(min-width: 1024px)');

  const variants: Variants = {
    enter: {
      x: lg ? undefined : '0%',
      opacity: lg ? 1 : undefined,
    },

    exit: {
      x: lg ? undefined : '100%',
      opacity: lg ? 0 : undefined,
    },
  };

  return (
    <>
      <Button
        variant='light'
        isIconOnly
        aria-label='Open credits modal'
        onPress={onOpen}
        className='absolute top-safe right-safe'
      >
        <InfoIcon />
      </Button>
      <Modal
        hideCloseButton={!lg}
        closeButton={
          <Button variant='light' isIconOnly aria-label='Close credits modal'>
            <CloseIcon />
          </Button>
        }
        size='full'
        backdrop='transparent'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants,
          drag: !lg && 'x',
          dragSnapToOrigin: true,
          dragConstraints: { left: 0 },
          dragElastic: 0,
          dragTransition: {
            bounceStiffness: 500,
            bounceDamping: 50,
          },
          onDragEnd: (_e, info) => {
            if (
              info.offset.x >= window.innerWidth / 2 ||
              info.velocity.x >= 250
            ) {
              onClose();
            }
          },
        }}
        classNames={{
          base: 'bg-transparent/60 py-safe px-safe-or-5 backdrop-blur-2xl',
          header: 'p-0 text-6xl flex justify-center',
          body: 'p-0',
          footer: 'p-0 flex flex-col justify-center items-center gap-5',
        }}
      >
        <ModalContent>
          <ModalHeader>Credits</ModalHeader>
          <ModalBody>
            <Link
              isExternal
              href='https://streamlinehq.com/'
              color='primary'
              className='m-auto'
            >
              Free icons from StreamLine
            </Link>
          </ModalBody>
          <ModalFooter>
            <hr className='bg-white w-screen' />
            <div className='flex items-center gap-5'>
              <Link
                isExternal
                href='https://github.com/Den1Marshall'
                color='primary'
              >
                GitHub
              </Link>
              <Link
                isExternal
                href='mailto:denyshrychulevych@gmail.com'
                color='primary'
              >
                Email
              </Link>
              <Link
                isExternal
                href='https://www.instagram.com/d.e.n_marshall'
                color='primary'
              >
                Instagram
              </Link>
              <Link isExternal href='https://t.me/den_marshall' color='primary'>
                Telegram
              </Link>
            </div>
            <p className='text-center'>
              Copyright © {new Date().getFullYear()} Denys Hrychulevych. All
              rights reserved.
            </p>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    //         <Dialog className='size-full flex flex-col items-center gap-10 outline-none'>
    //           <footer className='mt-auto w-full flex flex-col justify-center items-center gap-5'>
    //           </footer>
    //         </Dialog>
  );
};
