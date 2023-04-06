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
import { Link } from 'react-router-dom';

export const Animals = ({ setAnimal }) => {
  const selectAnimal = (animal) => setAnimal(animal);

  return (
    <section className="animals">
      <h2 className="animals__title">Choose your animal</h2>
      <div className="container animals__container">
        <Link
          to={'/'}
          className="animals__animal"
          onClick={() => selectAnimal(cat)}
        ></Link>
        <Link
          to={'/'}
          className="animals__animal"
          onClick={() => selectAnimal(dog)}
        ></Link>
        <Link
          to={'/'}
          className="animals__animal"
          onClick={() => selectAnimal(hamster)}
        ></Link>
        <Link
          to={'/'}
          className="animals__animal"
          onClick={() => selectAnimal(mouse)}
        ></Link>
        <Link
          to={'/'}
          className="animals__animal"
          onClick={() => selectAnimal(rabbit)}
        ></Link>
        <Link
          to={'/'}
          className="animals__animal"
          onClick={() => selectAnimal(fox)}
        ></Link>
        <Link
          to={'/'}
          className="animals__animal"
          onClick={() => selectAnimal(chick)}
        ></Link>
        <Link
          to={'/'}
          className="animals__animal"
          onClick={() => selectAnimal(goat)}
        ></Link>
        <Link
          to={'/'}
          className="animals__animal"
          onClick={() => selectAnimal(horse)}
        ></Link>
        <Link
          to={'/'}
          className="animals__animal"
          onClick={() => selectAnimal(cow)}
        ></Link>
        <Link
          to={'/'}
          className="animals__animal"
          onClick={() => selectAnimal(pig)}
        ></Link>
      </div>
    </section>
  );
};
