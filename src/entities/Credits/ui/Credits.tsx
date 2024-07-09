'use client';
import { CloseIcon } from '@/shared/ui/CloseIcon';
import { InfoIcon } from '@/shared/ui/InfoIcon';
import { Link } from '@nextui-org/react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
} from 'react-aria-components';
import { useMediaQuery } from 'usehooks-ts';

const MotionModal = motion(Modal);

export const Credits: FC = () => {
  const [isOpen, setOpen] = useState(false);

  const lg = useMediaQuery('(min-width: 1024px)');

  const variants: Variants = {
    enter: {
      transform: lg ? undefined : 'translateX(0%)',
      opacity: lg ? 1 : undefined,
    },

    exit: {
      transform: lg ? undefined : 'translateX(100%)',
      opacity: lg ? 0 : undefined,
    },
  };

  return (
    <DialogTrigger>
      <Button
        aria-label='Open info menu'
        onPress={() => setOpen(!isOpen)}
        className={({ isFocusVisible }) =>
          `z-[51] absolute top-safe-or-3 right-safe-or-5 ${
            !isFocusVisible && 'outline-none'
          }`
        }
      >
        {isOpen ? <CloseIcon /> : <InfoIcon />}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <MotionModal
            isOpen
            onOpenChange={setOpen}
            variants={variants}
            initial={'exit'}
            animate={'enter'}
            exit={'exit'}
            // drag={!lg && 'x'}
            // dragSnapToOrigin
            // dragConstraints={{ left: 0 }}
            // dragElastic={0}
            // dragTransition={{
            //   bounceStiffness: 500,
            //   bounceDamping: 50,
            //   restDelta: 0.0001,
            // }}
            // onDragEnd={(_e, info) => {
            //   if (
            //     info.offset.x >= window.innerWidth / 2 ||
            //     info.velocity.x >= 450
            //   ) {
            //     setOpen(false);
            //   }
            // }}
            className='z-50 fixed bottom-0 right-0 size-full p-safe-or-5 bg-white/35 dark:bg-black/35 backdrop-blur-3xl'
          >
            <Dialog className='size-full flex flex-col items-center gap-10 outline-none'>
              <div className='relative w-full flex items-center justify-center'>
                <Heading slot='title' className='text-6xl'>
                  Credits
                </Heading>
              </div>
              <Link
                isExternal
                href='https://streamlinehq.com/'
                color='primary'
                className='my-auto'
              >
                Free icons from StreamLine
              </Link>
              <footer className='mt-auto w-full flex flex-col justify-center items-center gap-5'>
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
                  <Link
                    isExternal
                    href='https://t.me/den_marshall'
                    color='primary'
                  >
                    Telegram
                  </Link>
                </div>
                <p className='text-center'>
                  Copyright © {new Date().getFullYear()} Denys Hrychulevych. All
                  rights reserved.
                </p>
              </footer>
            </Dialog>
          </MotionModal>
        )}
      </AnimatePresence>
    </DialogTrigger>
  );
};
