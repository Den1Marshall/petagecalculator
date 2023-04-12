import { cat } from '../utils/cat';
import { dog } from '../utils/dog';
import { hamster } from '../utils/hamster';
import { mouse } from '../utils/mouse';
import { rabbit } from '../utils/rabbit';
import { fox } from '../utils/fox';
import { chick } from '../utils/chick';
import { goat } from '../utils/goat';
import { horse } from '../utils/horse';
import { cow } from '../utils/cow';
import { pig } from '../utils/pig';

export const initialState = cat;

const animalReducer = (state, action) => {
  switch (action.type) {
    case 'Cat':
      return cat;

    case 'Dog':
      return dog;

    case 'Hamster':
      return hamster;

    case 'Mouse':
      return mouse;

    case 'Rabbit':
      return rabbit;

    case 'Fox':
      return fox;

    case 'Chick':
      return chick;

    case 'Goat':
      return goat;

    case 'Horse':
      return horse;

    case 'Cow':
      return cow;

    case 'Pig':
      return pig;

    default:
      return cat;
  }
};

export default animalReducer;
