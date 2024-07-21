import { IPet } from '@/entities/Pet';
import { CalendarDate } from '@internationalized/date';
import cat from '@/../public/images/animals/cat.png';
import dog from '@/../public/images/animals/dog.png';

export const petsPlaceholder: IPet[] = [
  {
    name: 'My Cat',
    image: cat,
    birthDate: new CalendarDate(2018, 7, 14),
  },
  {
    name: 'My Dog',
    image: dog,
    birthDate: new CalendarDate(2013, 5, 12),
  },
];
