import { Animal } from './types';
import catImage from '@/../public/images/animals/cat.png';

const ages: [string, string][] = [
  ['0', 'months'],
  ['1', 'month'],
  ['2', 'months'],
  ['3', 'months'],
  ['4', 'months'],
  ['5', 'months'],
  ['6', 'months'],
  ['7', 'months'],
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
];

const humanAges: number[] = [
  0, 1, 2, 4, 6, 8, 10, 12, 15, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68,
  72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116,
];

export const cat = new Animal('Cat', ages, humanAges, catImage);
