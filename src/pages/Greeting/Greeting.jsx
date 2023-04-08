import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './Greeting.css';
import logo from './logo192.png';

export const Greeting = () => {
  const greetingTitle = useRef(null);
  const greetingList = useRef(null);
  const greetingBtn = useRef(null);
  const greetingIcon = useRef(null);

  const navigate = useNavigate();

  const onBtnClick = () => {
    greetingBtn.current.classList.add('greeting__btn-animation');
    greetingBtn.current.onanimationend = () => {
      greetingTitle.current.style.display = 'none';
      greetingList.current.style.display = 'none';
      greetingBtn.current.style.display = 'none';

      greetingIcon.current.style.display = 'block';
      greetingIcon.current.onanimationend = () => {
        localStorage.setItem('greetingVisible', 'false');
        navigate('/');
      };
    };
  };

  return (
    <>
      <section className="greeting">
        <div className="container">
          <h2 ref={greetingTitle} className="greeting__title">
            What is
            <br />
            Pet Age Calculator?
          </h2>
          <ul ref={greetingList} className="greeting__list">
            <li className="greeting__item">
              Your pocket helper will help you to find out the age of your pet
              in human years.
            </li>
            <li className="greeting__item">
              Fully free but you can always support by donating or leaving
              pleasant recall.
            </li>
            <li className="greeting__item">
              Useful for kids and fun for adults.
            </li>
            <li className="greeting__item">
              Simple and beautiful: just choose animal you want (by clicking on
              animal icon) and drag slider to enter it's age.
            </li>
          </ul>
          <button
            ref={greetingBtn}
            className="greeting__btn"
            onClick={onBtnClick}
          >
            Continue
          </button>
          <img
            ref={greetingIcon}
            className="greeting__icon"
            src={logo}
            alt="PAC logo"
          />
        </div>
      </section>
    </>
  );
};
