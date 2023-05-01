import { Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { Theme } from './utils/Theme';

import AnimalProvider from './context/AnimalContext';

import { Footer } from './layouts/Footer/Footer';
import { Greeting } from './pages/Greeting/Greeting';
import { Home } from './pages/Home/Home';
import { Animals } from './pages/Animals/Animals';

export const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <AnimalProvider>
        <Routes>
          <Route path='/' element={<Footer />}>
            <Route index element={<Home />} />
            <Route path='/animals' element={<Animals />} />
            <Route path='/greeting' element={<Greeting />} />
            <Route path='*' element={<Home />} />
          </Route>
        </Routes>
      </AnimalProvider>
    </ThemeProvider>
  );
};
