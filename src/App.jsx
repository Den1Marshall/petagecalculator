import { useState } from 'react';
import { Footer } from './layouts/Footer/Footer';
import { Greeting } from './pages/Greeting/Greeting';
import { Home } from './pages/Home/Home';
import { Animals } from './pages/Animals/Animals';

//
import { cat } from './utils/cat';

export const App = () => {
  const [greetingVisible, setGreetingVisible] = useState(
    !Boolean(localStorage.getItem('greetingVisible'))
  );
  const [animalsVisible, setAnimalsVisible] = useState(false);
  const [animal, setAnimal] = useState(cat);

  return (
    <>
      {greetingVisible && <Greeting setGreetingVisible={setGreetingVisible} />}

      {!greetingVisible && !animalsVisible && (
        <Home setAnimalsVisible={setAnimalsVisible} animal={animal} />
      )}

      {animalsVisible && (
        <Animals setAnimalsVisible={setAnimalsVisible} setAnimal={setAnimal} />
      )}
      <Footer setGreetingVisible={setGreetingVisible} />
    </>
  );
};
