import { Home } from './pages/Home';
import { useState } from 'react';
import { Greeting } from './pages/Greeting';
import { Footer } from './components/Footer/Footer';
import { Animals } from './pages/Animals';

// 
import { cat } from './features/cat';

export const App = () => {
    const [greetingVisible, setGreetingVisible] = useState(!Boolean(localStorage.getItem('greetingVisible')));
    const [animalsVisible, setAnimalsVisible] = useState(false);
    const [animal, setAnimal] = useState(cat);

    if (greetingVisible) {
        return (
            <>
            <Greeting setGreetingVisible={setGreetingVisible} />
            <Footer setGreetingVisible={setGreetingVisible} />
            </>
        )
    }

    if (!greetingVisible && !animalsVisible) {
        return (
            <>
            <Home setAnimalsVisible={setAnimalsVisible} animal={animal}/>
            <Footer setGreetingVisible={setGreetingVisible} />
            </>
        )
    }

    if (animalsVisible) {
        return (
            <>
            <Animals setAnimalsVisible={setAnimalsVisible} setAnimal={setAnimal} />
            <Footer setGreetingVisible={setGreetingVisible} />
            </>
        )
    }
};