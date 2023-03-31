import { useEffect, useState } from 'react';
import './Calculator.css';

export const Calculator = ({ setAnimalsVisible, animal }) => {
    const [sliderValue, setSliderValue] = useState(0);

    const [animalAge, setAnimalAge] = useState(0);
    const [humanAge, setHumanAge] = useState(0);

    const onSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    useEffect(() => {
        setAnimalAge(animal.ages.find((age, index) => index === +sliderValue));
        setHumanAge(animal.humanAges.find((age, index) => index === +sliderValue));
    }, [sliderValue, animal.ages, animal.humanAges])

    const onAnimalIconClick = () => setAnimalsVisible(true);

    return (
        <section className="calculator">
            <div className="calculator__left">
                <button className="calculator__character calculator__character--animal" onClick={onAnimalIconClick}>
                    <img src={animal.iconSrc} alt="Animal icon" className="calculator__character-img" />
                </button>
                <p className="calculator__age">{animalAge[0]}</p>
                <p className="calculator__text">{animalAge[1]}</p>
            </div>
            <div className="calculator__right">
                <div className="calculator__character calculator__character--human"></div>
                <p className="calculator__age">{humanAge}</p>
                <p className="calculator__text">years</p>
            </div>
            <input className="calculator__slider" type="range" min={animal.minSliderValue} max={animal.maxSliderValue} value={sliderValue} onChange={onSliderChange} />
        </section>
    )
}