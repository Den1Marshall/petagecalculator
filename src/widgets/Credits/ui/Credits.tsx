'use client';
import { Icon } from './Icon';
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

export const Credits: FC = () => {
  const { isOpen, onOpenChange } = useDisclosure();

  const variants: Variants = {
    enter: {
      transform: 'translateX(0%)',
    },

    exit: {
      transform: 'translateX(100%)',
    },
  };

  return (
    <>
      <Button
        variant='light'
        isIconOnly
        aria-label={`${isOpen ? 'Close' : 'Open'} credits modal`}
        onPress={onOpenChange}
        className='absolute z-[51] top-safe-or-1 right-safe-or-1'
      >
        <Icon isOpen={isOpen} />
      </Button>

      <Modal
        hideCloseButton
        size='full'
        backdrop='transparent'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants,
        }}
        classNames={{
          base: 'p-safe-or-5 backdrop-blur-2xl bg-overlay/3',
          header: 'p-0 flex justify-center text-6xl',
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
