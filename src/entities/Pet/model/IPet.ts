import { CalendarDate } from '@internationalized/date';

export interface IPet {
  uuid: string;
  name: string;
  image: string;
  birthDate: CalendarDate;
}
