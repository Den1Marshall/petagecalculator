import { CalendarDate } from '@internationalized/date';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface IPet {
  name: string;
  image: StaticImport | string;
  birthDate: CalendarDate;
}
