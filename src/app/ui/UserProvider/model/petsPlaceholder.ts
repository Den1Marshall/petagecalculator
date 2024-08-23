import { IPet } from '@/entities/Pet';
import { CalendarDate } from '@internationalized/date';
import cat from '@/../public/images/animals/cat.png';
import dog from '@/../public/images/animals/dog.png';

export const petsPlaceholder: IPet[] = [
  {
    uuid: '0',
    name: 'My Cat',
    image: cat.src,
    birthDate: new CalendarDate(2018, 7, 14),
  },
  {
    uuid: '1',
    name: 'My Dog',
    image: dog.src,
    birthDate: new CalendarDate(2013, 5, 12),
  },
];
