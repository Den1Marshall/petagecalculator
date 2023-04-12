import './Home.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeTitle } from '../../components/HomeTitle/HomeTitle';
import { HomeCalculator } from '../../components/HomeCalculator/HomeCalculator';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('greetingVisible') === null) {
      navigate('/greeting');
    }
  }, [navigate]);

  return (
    <main className='home'>
      <div className='container'>
        <HomeTitle />
        <HomeCalculator />
      </div>
    </main>
  );
};
