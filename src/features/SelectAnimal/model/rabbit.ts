import { Animal } from './types';
import rabbitImage from '@/../public/images/animals/rabbit.png';

const ages: [string, string][] = [
  ['0', 'weeks'],
  ['1', 'week'],
  ['2', 'weeks'],
  ['3', 'weeks'],
  ['1', 'month'],
  ['2', 'months'],
  ['3', 'months'],
  ['4', 'months'],
  ['5', 'months'],
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
];

const humanAges = [
  0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75,
];

export const rabbit = new Animal('Rabbit', ages, humanAges, rabbitImage);
