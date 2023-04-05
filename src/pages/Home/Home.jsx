import './Home.css';

import { HomeTitle } from './HomeTitle/HomeTitle';
import { Calculator } from './HomeCalculator/HomeCalculator';

export const Home = ({ setAnimalsVisible, animal }) => {
  return (
    <main className="home">
      <div className="container">
        <HomeTitle />
        <Calculator setAnimalsVisible={setAnimalsVisible} animal={animal} />
      </div>
    </main>
  );
};
