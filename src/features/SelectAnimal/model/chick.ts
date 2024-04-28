import { Animal } from './types';
import chickImage from '@/../public/images/animals/chick.png';

const ages: [string, string][] = [
  ['0', 'months'],
  ['5', 'months'],
  ['6', 'months'],
  ['7', 'months'],
  ['8', 'months'],
  ['9', 'months'],
  ['10', 'months'],
  ['11', 'months'],
  ['1', 'year'],
  ['1.2', 'years'],
  ['1.4', 'years'],
  ['1.6', 'years'],
  ['1.8', 'years'],
  ['2', 'years'],
  ['3', 'years'],
  ['4', 'years'],
  ['5', 'years'],
  ['6', 'years'],
  ['7', 'years'],
];

const humanAges = [
  0, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 27, 33, 40, 50, 60, 70,
];

export const chick = new Animal('Chick', ages, humanAges, chickImage);
