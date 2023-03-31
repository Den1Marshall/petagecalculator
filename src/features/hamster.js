import { Animal } from "./Animal";

import icon from '../assets/hamster.png';

const ages = [['0', 'months'], ['1', 'month'], ['2', 'months'], ['4', 'months'], ['6', 'months'], ['8', 'months'], ['10', 'months'], ['1', 'year'], ['2', 'years'], ['3', 'years'], ['4', 'years'], ['5', 'years']];

const humanAges = [0, 14, 20, 26, 34, 42, 50, 58, 70, 100, 130, 160];

const hamster = new Animal('Hamster', ages, humanAges, icon, 0, 11);

export { hamster };