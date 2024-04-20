import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  fallback: ['system-ui', 'arial'],
});

export const theme = extendTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },

  colorSchemes: {
    light: {},

    dark: {
      palette: {
        background: {
          default: '#000',
        },
      },
    },
  },

  components: {
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
      },
    },
  },
});
