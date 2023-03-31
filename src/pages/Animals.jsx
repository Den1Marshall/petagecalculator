import './Animals.css';

import { cat } from '../features/cat';
import { dog } from '../features/dog';
import { hamster } from '../features/hamster';
import { mouse } from '../features/mouse';
import { rabbit } from '../features/rabbit';
import { fox } from '../features/fox';
import { chick } from '../features/chick';
import { goat } from '../features/goat';
import { horse } from '../features/horse';
import { cow } from '../features/cow';
import { pig } from '../features/pig';

export const Animals = ({ setAnimalsVisible, setAnimal }) => {

    const selectAnimal = (animal) => {
        setAnimal(animal);
        setAnimalsVisible(false);
    };

    return (
        <section className="animals">
            <h2 className="animals__title">Choose your animal</h2>
            <div className="container animals__container">
                <button className="animals__animal" onClick={() => selectAnimal(cat)}></button>
                <button className="animals__animal" onClick={() => selectAnimal(dog)}></button>
                <button className="animals__animal" onClick={() => selectAnimal(hamster)}></button>
                <button className="animals__animal" onClick={() => selectAnimal(mouse)}></button>
                <button className="animals__animal" onClick={() => selectAnimal(rabbit)}></button>
                <button className="animals__animal" onClick={() => selectAnimal(fox)}></button>
                <button className="animals__animal" onClick={() => selectAnimal(chick)}></button>
                <button className="animals__animal" onClick={() => selectAnimal(goat)}></button>
                <button className="animals__animal" onClick={() => selectAnimal(horse)}></button>
                <button className="animals__animal" onClick={() => selectAnimal(cow)}></button>
                <button className="animals__animal" onClick={() => selectAnimal(pig)}></button>
            </div>
        </section>
    )
}