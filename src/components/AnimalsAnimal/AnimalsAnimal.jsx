import styles from './AnimalsAnimal.module.css';

import { Link } from 'react-router-dom';

const AnimalsAnimal = ({ animal, onClick }) => {
  return (
    <Link to={'/'} className={styles.animal} onClick={onClick}>
      <img src={animal.iconSrc} alt='Animal icon' />
    </Link>
  );
};

export default AnimalsAnimal;
