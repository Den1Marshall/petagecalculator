import './HomeCalculator.css';

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from '@mui/material';

import { AnimalContext } from '../../context/AnimalContext';

export const HomeCalculator = () => {
  const { animal } = useContext(AnimalContext);

  const [slider, setSlider] = useState({
    sliderValue: 0,
    animalAge: animal.ages[0],
    humanAge: 0,
  });

  const onSliderChange = (e) => {
    setSlider({
      sliderValue: e.target.value,
      animalAge: animal.ages.find((age, index) => index === e.target.value),
      humanAge: animal.humanAges.find((age, index) => index === e.target.value),
    });
  };

  console.log('calculator render');

  return (
    <section className='calculator'>
      <div className='calculator__left'>
        <Link
          to={'/animals'}
          className='calculator__character calculator__character-animal'
        >
          <img
            src={animal.iconSrc}
            alt='Animal icon'
            className='calculator__character-img'
          />
        </Link>
        <p className='calculator__age'>{slider.animalAge[0]}</p>
        <p className='calculator__text'>{slider.animalAge[1]}</p>
      </div>
      <div className='calculator__right'>
        <div className='calculator__character calculator__character-human'></div>
        <p className='calculator__age'>{slider.humanAge}</p>
        <p className='calculator__text'>years</p>
      </div>
      <Slider
        value={slider.sliderValue}
        min={animal.minSliderValue}
        max={animal.maxSliderValue}
        onChange={onSliderChange}
        color='primary'
        sx={{
          marginTop: '50px',
        }}
      />
    </section>
  );
};
