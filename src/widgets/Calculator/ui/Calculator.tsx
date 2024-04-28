'use client';
import { AnimalButton } from '@/entities/AnimalButton';
import { FC, useState } from 'react';
import humanImage from '@/../public/images/animals/human.png';
import { AnimalAge } from '@/entities/AnimalAge';
import { Animal, SelectAnimal, animals } from '@/features/SelectAnimal';
import { SelectAnimalAge } from '@/features/SelectAnimalAge';

export const Calculator: FC = () => {
  const [animal, setAnimal] = useState(animals[0]);
  const [age, setAge] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectNewAnimal = (animal: Animal) => {
    setAnimal(animal);
    setAge(0);
  };

  return (
    <article className='my-auto flex flex-col gap-16 justify-center items-center text-center'>
      <div className='flex gap-10 justify-center'>
        <div className='flex flex-col gap-10'>
          <AnimalButton
            openModal={() => setIsModalOpen(!isModalOpen)}
            src={animal.src}
            name={animal.name}
          />
          <AnimalAge age={animal.ages[age]} />
        </div>
        <div className='w-[1px] border border-white' />
        <div className='flex flex-col gap-10'>
          <AnimalButton src={humanImage} name='Human' isHuman />
          <AnimalAge humanAge={animal.humanAges[age]} />
        </div>
      </div>
      <SelectAnimalAge
        age={age}
        setAge={setAge}
        maxValue={animal.maxSliderValue}
      />
      <SelectAnimal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectNewAnimal={selectNewAnimal}
      />
    </article>
  );
};
