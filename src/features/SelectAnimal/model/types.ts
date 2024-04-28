import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export class Animal {
  maxSliderValue: number;

  constructor(
    public name: string,
    public ages: [string, string][],
    public humanAges: number[],
    public src: string | StaticImport,
    public human?: boolean
  ) {
    this.maxSliderValue = ages.length - 1;
  }
}
