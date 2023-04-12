import './Animals.css';

import { useContext } from 'react';

import { AnimalContext } from '../../context/AnimalContext';
import animalsList from '../../utils/animalsList';
import AnimalsAnimal from '../../components/AnimalsAnimal/AnimalsAnimal';

export const Animals = () => {
  const { selectAnimal } = useContext(AnimalContext);

  return (
    <section className='animals'>
      <h2 className='animals__title'>Choose your animal</h2>
      <div className='container animals__container'>
        {animalsList.map((animal) => (
          <AnimalsAnimal
            key={animal.type}
            animal={animal}
            onClick={() => selectAnimal({ type: animal.type })}
          />
        ))}
      </div>
    </section>
  );
};
