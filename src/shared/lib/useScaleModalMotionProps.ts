import { MotionProps } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';

export const useScaleModalMotionProps = (): MotionProps => {
  const lg = useMediaQuery('(min-width: 1024px)');

  const lgMotionProps: MotionProps = {
    variants: {
      enter: {
        transform: 'scale(1)',
        opacity: 1,
      },
      exit: { transform: 'scale(1.05)', opacity: 0 },
    },
  };

  const smMotionProps: MotionProps = {
    variants: {
      enter: {
        transform: 'translateY(0%)',
        opacity: 1,
      },
      exit: { transform: 'translateY(10%)', opacity: 0 },
    },
  };

  return lg ? lgMotionProps : smMotionProps;
};
