import { Animal } from './types';
import goatImage from '@/../public/images/animals/goat.png';

const ages: [string, string][] = [
  ['0', 'months'],
  ['6', 'months'],
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
  ['17', 'years'],
  ['18', 'years'],
];

const humanAges = [
  0, 5, 18, 24, 28, 33, 37, 42, 46, 50, 55, 59, 64, 68, 73, 77, 81, 86, 90, 95,
];

export const goat = new Animal('Goat', ages, humanAges, goatImage);
