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
    case 'cat':
      return cat;

    case 'dog':
      return dog;

    case 'hamster':
      return hamster;

    case 'mouse':
      return mouse;

    case 'rabbit':
      return rabbit;

    case 'fox':
      return fox;

    case 'chick':
      return chick;

    case 'goat':
      return goat;

    case 'horse':
      return horse;

    case 'cow':
      return cow;

    case 'pig':
      return pig;

    default:
      return cat;
  }
};

export default animalReducer;
