import { Animal } from './types';
import dogImage from '@/../public/images/animals/dog.png';

const ages: [string, string][] = [
  ['0', 'months'],
  ['2', 'months'],
  ['6', 'months'],
  ['8', 'months'],
  ['1', 'year'],
  ['2', 'years'],
  ['3', 'years'],
  ['4', 'years'],
  ['5', 'years'],
  ['6', 'years'],
  ['7', 'years'],
  ['8', 'years'],
  ['9', 'years'],
  ['10', 'years'],
  ['11', 'years'],
  ['12', 'years'],
  ['13', 'years'],
  ['14', 'years'],
  ['15', 'years'],
  ['16', 'years'],
];

const humanAges = [
  0, 1, 5, 9, 14, 24, 30, 36, 40, 42, 49, 56, 63, 65, 71, 75, 80, 84, 87, 89,
];

export const dog = new Animal('Dog', ages, humanAges, dogImage);
