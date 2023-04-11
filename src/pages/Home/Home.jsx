import './Home.css';

import { HomeTitle } from '../../components/HomeTitle/HomeTitle';
import { HomeCalculator } from '../../components/HomeCalculator/HomeCalculator';

export const Home = () => {
  return (
    <main className='home'>
      <div className='container'>
        <HomeTitle />
        <HomeCalculator />
      </div>
    </main>
  );
};
