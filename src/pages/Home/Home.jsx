import './Home.css';

import { HomeTitle } from './HomeTitle/HomeTitle';
import { HomeCalculator } from './HomeCalculator/HomeCalculator';

export const Home = ({ animal }) => {
  return (
    <main className="home">
      <div className="container">
        <HomeTitle />
        <HomeCalculator animal={animal} />
      </div>
    </main>
  );
};
