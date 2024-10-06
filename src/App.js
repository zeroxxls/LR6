import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(1);

  const prevCard = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? people.length - 1 : prevIndex - 1));
  };

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex === people.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(nextCard, 2000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <section className='section'>
      <div className='title'>
        <h2>reviews</h2>
      </div>
      <div className='section-center'>
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          let position = 'nextSlide';

          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
            position = 'lastSlide';
          }
          if (personIndex === index + 1 || (index === people.length - 1 && personIndex === 0)) {
            position = 'nextSlide';
          }

          return (
            <article key={id} className={position}>
              <img src={image} alt={name} className='person-img' />
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className='quote'>{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          );
        })}
        <button onClick={prevCard} className='prev'>
          <FiChevronLeft />
        </button>
        <button onClick={nextCard} className='next'>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
