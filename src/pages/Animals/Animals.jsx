import './Animals.css';

import { cat } from '../../utils/cat';
import { dog } from '../../utils/dog';
import { hamster } from '../../utils/hamster';
import { mouse } from '../../utils/mouse';
import { rabbit } from '../../utils/rabbit';
import { fox } from '../../utils/fox';
import { chick } from '../../utils/chick';
import { goat } from '../../utils/goat';
import { horse } from '../../utils/horse';
import { cow } from '../../utils/cow';
import { pig } from '../../utils/pig';

export const Animals = ({ setAnimalsVisible, setAnimal }) => {
  const selectAnimal = (animal) => {
    setAnimal(animal);
    setAnimalsVisible(false);
  };

  return (
    <section className="animals">
      <h2 className="animals__title">Choose your animal</h2>
      <div className="container animals__container">
        <button
          className="animals__animal"
          onClick={() => selectAnimal(cat)}
        ></button>
        <button
          className="animals__animal"
          onClick={() => selectAnimal(dog)}
        ></button>
        <button
          className="animals__animal"
          onClick={() => selectAnimal(hamster)}
        ></button>
        <button
          className="animals__animal"
          onClick={() => selectAnimal(mouse)}
        ></button>
        <button
          className="animals__animal"
          onClick={() => selectAnimal(rabbit)}
        ></button>
        <button
          className="animals__animal"
          onClick={() => selectAnimal(fox)}
        ></button>
        <button
          className="animals__animal"
          onClick={() => selectAnimal(chick)}
        ></button>
        <button
          className="animals__animal"
          onClick={() => selectAnimal(goat)}
        ></button>
        <button
          className="animals__animal"
          onClick={() => selectAnimal(horse)}
        ></button>
        <button
          className="animals__animal"
          onClick={() => selectAnimal(cow)}
        ></button>
        <button
          className="animals__animal"
          onClick={() => selectAnimal(pig)}
        ></button>
      </div>
    </section>
  );
};
