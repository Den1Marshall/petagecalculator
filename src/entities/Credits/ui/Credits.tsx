'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
} from 'react-aria-components';
import { useMediaQuery } from 'usehooks-ts';
import InfoOutline from '@spectrum-icons/workflow/InfoOutline';
import CloseCircle from '@spectrum-icons/workflow/CloseCircle';

const MotionModal = motion(Modal);

export const Credits: FC = () => {
  const [isOpen, setOpen] = useState(false);

  const lg = useMediaQuery('(min-width: 1024px)');

  return (
    <DialogTrigger>
      <Button
        aria-label='Open info menu'
        onPress={() => setOpen(!isOpen)}
        className={({ isFocusVisible }) =>
          `absolute top-safe-or-3 right-safe-or-5 lg:z-20 ${
            !isFocusVisible && 'outline-none'
          }`
        }
      >
        {isOpen ? (
          lg && <CloseCircle width={20} height={20} />
        ) : (
          <InfoOutline width={20} height={20} />
        )}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <MotionModal
            isOpen
            onOpenChange={setOpen}
            initial={{
              x: lg ? undefined : '100%',
              opacity: lg ? 0 : undefined,
            }}
            animate={{ x: lg ? undefined : '0%', opacity: lg ? 1 : undefined }}
            exit={{ x: lg ? undefined : '100%', opacity: lg ? 0 : undefined }}
            transition={{
              type: 'spring',
              duration: 0.5,
              bounce: 0,
              restDelta: 0.0001,
            }}
            drag={!lg && 'x'}
            dragSnapToOrigin
            dragConstraints={{ left: 0 }}
            dragElastic={0}
            dragTransition={{
              bounceStiffness: 500,
              bounceDamping: 50,
              restDelta: 0.0001,
            }}
            onDragEnd={(_e, info) => {
              if (
                info.offset.x >= window.innerWidth / 2 ||
                info.velocity.x >= 450
              ) {
                setOpen(false);
              }
            }}
            className='z-50 fixed bottom-0 right-0 size-full p-safe-or-5 bg-white/35 dark:bg-black/35 backdrop-blur-3xl'
          >
            <Dialog className='size-full flex flex-col items-center gap-10 outline-none'>
              <div className='relative w-full flex items-center justify-center'>
                <Button
                  onPress={() => setOpen(false)}
                  className={({ isFocusVisible }) =>
                    `left-0 absolute rotate-180 fill-white lg:hidden ${
                      !isFocusVisible && 'outline-none'
                    }`
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                  >
                    <g id='ArrowSize600'>
                      <rect
                        id='Frame'
                        width='20'
                        height='20'
                        fill='red'
                        opacity='0'
                      />
                      <path d='M18.42316,10.40973a1.07,1.07,0,0,0,.076-.37659c.00036-.01166.00671-.02142.00671-.03314s-.00629-.02142-.00665-.033a1.04509,1.04509,0,0,0-.30841-.72638L12.20508,3.25391A1.07309,1.07309,0,0,0,10.6875,4.77148l4.1546,4.15528H2.063a1.07324,1.07324,0,1,0,0,2.14648H14.8421l-4.1546,4.15528a1.07309,1.07309,0,1,0,1.51758,1.51757L18.1908,10.7594A1.07359,1.07359,0,0,0,18.42316,10.40973Z' />
                    </g>
                  </svg>
                </Button>
                <Heading slot='title' className='text-6xl'>
                  Credits
                </Heading>
              </div>
              <a
                href='https://streamlinehq.com/'
                rel='noopener noreferrer'
                target='_blank'
                className='inline-block my-auto text-blue-400 hover:underline'
              >
                Free icons from StreamLine
              </a>
              <footer className='mt-auto w-full flex flex-col justify-center items-center gap-5'>
                <hr className='bg-white w-screen' />
                <div className='flex items-center gap-5'>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href='https://github.com/Den1Marshall'
                    className='text-blue-400 hover:underline'
                  >
                    GitHub
                  </a>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href='mailto:denyshrychulevych@gmail.com'
                    className='text-blue-400 hover:underline'
                  >
                    Email
                  </a>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href='https://www.instagram.com/d.e.n_marshall/'
                    className='text-blue-400 hover:underline'
                  >
                    Instagram
                  </a>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href='https://t.me/den_marshall'
                    className='text-blue-400 hover:underline'
                  >
                    Telegram
                  </a>
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
