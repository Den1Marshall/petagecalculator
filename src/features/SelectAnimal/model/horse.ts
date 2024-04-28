import { Animal } from './types';
import horseImage from '@/../public/images/animals/horse.png';

const ages: [string, string][] = [
  ['0', 'years'],
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
  ['21', 'years'],
  ['22', 'years'],
  ['23', 'years'],
  ['24', 'years'],
  ['25', 'years'],
  ['26', 'years'],
  ['27', 'years'],
  ['28', 'years'],
  ['29', 'years'],
  ['30', 'years'],
  ['31', 'years'],
  ['32', 'years'],
];

const humanAges = [
  0, 12, 19, 23, 27, 31, 34, 36, 37, 41, 44, 46, 49, 51, 54, 56, 59, 61, 64, 66,
  69, 71, 74, 76, 79, 81, 84, 86, 89, 91, 94, 96, 99,
];

export const horse = new Animal('Horse', ages, humanAges, horseImage);
