import { useEffect } from 'react';
import './Greeting.css';

import logo from './logo192.png';

export const Greeting = ({ setGreetingVisible }) => {
    useEffect(() => {
        const btn = document.querySelector('.greeting__btn');
        const greetingTitle = document.querySelector('.greeting__title');
        const greetingList = document.querySelector('.greeting__list');
        const greetingIcon = document.querySelector('.greeting__icon');

        const onBtnClick = () => {
            btn.classList.add('greeting__btn-animation');
            btn.onanimationend = () => {
                greetingTitle.style.display = 'none';
                greetingList.style.display = 'none';
                btn.style.display = 'none';
                greetingIcon.style.display = 'initial';
                setTimeout(() => {
                    localStorage.setItem('greetingVisible', 'true');
                    setGreetingVisible(!Boolean(localStorage.getItem('greetingVisible')))
                }, 1000);
            }
        };

        btn.addEventListener('click', onBtnClick);

        return () => btn.removeEventListener('click', onBtnClick);
    });

    return (
        <>
        <section className="greeting">
            <div className="container">
                <h2 className="greeting__title">
                    What is 
                    <br /> 
                    Pet Age Calculator?
                </h2>
                <ul className="greeting__list">
                    <li className="greeting__item">Your pocket helper will help you to find out the age of your pet in human years.</li>
                    <li className="greeting__item">Fully free but you can always support by donating or leaving pleasant recall.</li>
                    <li className="greeting__item">Useful for kids and fun for adults.</li>
                    <li className="greeting__item">Simple and beautiful: just choose animal you want (by clicking on animal icon) and drag slider to enter it's age.</li>
                </ul>
                <button className="greeting__btn">Continue</button>
                <img className="greeting__icon" src={logo} alt="PAC logo" />
            </div>
        </section>
        </>
    )
}