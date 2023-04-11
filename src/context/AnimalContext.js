import { createContext, useReducer } from 'react';
import animalReducer, { initialState } from '../state/animalReducer';

export const AnimalContext = createContext(null);

const AnimalProvider = ({ children }) => {
  const [animal, selectAnimal] = useReducer(animalReducer, initialState);
  return (
    <AnimalContext.Provider value={{ animal, selectAnimal }}>
      {children}
    </AnimalContext.Provider>
  );
};

export default AnimalProvider;
