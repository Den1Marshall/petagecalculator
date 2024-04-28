import { Animal } from './types';
import foxImage from '@/../public/images/animals/fox.png';

const ages: [string, string][] = [
  ['0', 'months'],
  ['1', 'month'],
  ['2', 'months'],
  ['3', 'months'],
  ['4', 'months'],
  ['5', 'months'],
  ['6', 'months'],
  ['7', 'months'],
  ['8', 'months'],
  ['9', 'months'],
  ['10', 'months'],
  ['11', 'months'],
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
];

const humanAges = [
  0, 1, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 28, 35, 42, 50, 58, 65, 72, 79,
  86, 93, 100, 107, 114, 121,
];

export const fox = new Animal('Fox', ages, humanAges, foxImage);
