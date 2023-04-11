import './Animals.css';

import { useContext } from 'react';

import { Link } from 'react-router-dom';
import { AnimalContext } from '../../context/AnimalContext';

export const Animals = () => {
  const { selectAnimal } = useContext(AnimalContext);

  console.log('animals render');

  return (
    <section className='animals'>
      <h2 className='animals__title'>Choose your animal</h2>
      <div className='container animals__container'>
        <Link
          to={'/'}
          className='animals__animal'
          onClick={() => selectAnimal({ type: 'cat' })}
        ></Link>
        <Link
          to={'/'}
          className='animals__animal'
          onClick={() => selectAnimal({ type: 'dog' })}
        ></Link>
        <Link
          to={'/'}
          className='animals__animal'
          onClick={() => selectAnimal({ type: 'hamster' })}
        ></Link>
        <Link
          to={'/'}
          className='animals__animal'
          onClick={() => selectAnimal({ type: 'mouse' })}
        ></Link>
        <Link
          to={'/'}
          className='animals__animal'
          onClick={() => selectAnimal({ type: 'rabbit' })}
        ></Link>
        <Link
          to={'/'}
          className='animals__animal'
          onClick={() => selectAnimal({ type: 'fox' })}
        ></Link>
        <Link
          to={'/'}
          className='animals__animal'
          onClick={() => selectAnimal({ type: 'chick' })}
        ></Link>
        <Link
          to={'/'}
          className='animals__animal'
          onClick={() => selectAnimal({ type: 'goat' })}
        ></Link>
        <Link
          to={'/'}
          className='animals__animal'
          onClick={() => selectAnimal({ type: 'horse' })}
        ></Link>
        <Link
          to={'/'}
          className='animals__animal'
          onClick={() => selectAnimal({ type: 'cow' })}
        ></Link>
        <Link
          to={'/'}
          className='animals__animal'
          onClick={() => selectAnimal({ type: 'pig' })}
        ></Link>
      </div>
    </section>
  );
};
