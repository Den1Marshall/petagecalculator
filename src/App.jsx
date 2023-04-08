import { useEffect, useState } from 'react';
import { Footer } from './layouts/Footer/Footer';
import { Greeting } from './pages/Greeting/Greeting';
import { Home } from './pages/Home/Home';
import { Animals } from './pages/Animals/Animals';

//
import { cat } from './utils/cat';
import { Route, Routes, useNavigate } from 'react-router-dom';

export const App = () => {
  const [animal, setAnimal] = useState(cat);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('greetingVisible') === null) {
      navigate('/greeting');
    }
  }, []);

  console.log('app render');

  return (
    <Routes>
      <Route path="/" element={<Footer />}>
        <Route index element={<Home animal={animal} />} />
        <Route path="/animals" element={<Animals setAnimal={setAnimal} />} />
        <Route path="/greeting" element={<Greeting />} />
      </Route>
    </Routes>
  );
};
