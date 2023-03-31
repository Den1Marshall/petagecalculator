import { Animal } from "./Animal";

import icon from '../assets/mouse.png';

const ages = [['0', 'months'], ['1', 'month'], ['1.5', 'months'], ['6', 'months'], ['1', 'year'], ['1.5', 'years'], ['2', 'years'], ['2.5', 'years'], ['3', 'years'], ['3.5', 'years'], ['4', 'years']];

const humanAges = [0, 8, 13, 18, 30, 45, 60, 75, 90, 113, 120];

const mouse = new Animal('Mouse', ages, humanAges, icon, 0, 10);

export { mouse };