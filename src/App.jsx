import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { Footer } from './layouts/Footer/Footer';
import { Greeting } from './pages/Greeting/Greeting';
import { Home } from './pages/Home/Home';
import { Animals } from './pages/Animals/Animals';

import { ThemeProvider } from '@emotion/react';
import { Theme } from './utils/Theme';

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('greetingVisible') === null) {
      navigate('/greeting');
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={Theme}>
      <Routes>
        <Route path='/' element={<Footer />}>
          <Route index element={<Home />} />
          <Route path='/animals' element={<Animals />} />
          <Route path='/greeting' element={<Greeting />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
