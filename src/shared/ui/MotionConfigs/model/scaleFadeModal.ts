import { MotionProps } from 'framer-motion';

export const scaleFadeModal: MotionProps = {
  variants: {
    enter: {
      transform: 'scale(1)',
      opacity: 1,
    },
    exit: { transform: 'scale(0.8)', opacity: 0 },
  },
};
