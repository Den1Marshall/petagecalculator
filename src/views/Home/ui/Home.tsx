import { Credits } from '@/entities/Credits';
import { Calculator } from '@/widgets/Calculator';

export default function Home() {
  return (
    <main className='h-full flex flex-col items-center font-pacifico'>
      <h1 className='mt-4 text-8xl text-center'>
        Pet Age <br />
        <span className='text-5xl'>calculator</span>
      </h1>
      <Calculator />
      <Credits />
    </main>
  );
}
