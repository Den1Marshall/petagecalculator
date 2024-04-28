import { Animal } from './types';
import cowImage from '@/../public/images/animals/cow.png';

const ages: [string, string][] = [
  ['0', 'months'],
  ['3', 'months'],
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
  ['19', 'years'],
  ['20', 'years'],
];

const humanAges = [
  0, 4, 7, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78,
  82, 86, 90,
];

export const cow = new Animal('Cow', ages, humanAges, cowImage);
