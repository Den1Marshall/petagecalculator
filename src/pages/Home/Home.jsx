import './Home.css';

import { HomeTitle } from '../../components/HomeTitle/HomeTitle';
import { HomeCalculator } from '../../components/HomeCalculator/HomeCalculator';

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
