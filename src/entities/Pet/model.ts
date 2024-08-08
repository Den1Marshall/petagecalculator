import { CalendarDate } from '@internationalized/date';

export interface IPet {
  name: string;
  image: string;
  birthDate: CalendarDate;
}
