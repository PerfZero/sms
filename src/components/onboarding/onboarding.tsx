import React, { useState } from 'react';
import './onboarding.css';

const slides = [
  {
    title: 'Atlas Save — начало пути.',
    description: 'Копите на Умру и Хадж через Kaspi. Деньги хранятся отдельно — только на паломничество.',
    image: '/images/onboarding-1.png',
    showBackButton: false,
    nextButtonText: 'Далее'
  },
  {
    title: 'Копите за себя и близких.',
    description: 'Выбирайте цель, следите за прогрессом. Даже 1 000 ₸ — это шаг к Мекке.',
    image: '/images/onboarding-2.png',
    showBackButton: true,
    nextButtonText: 'Далее'
  },
  {
    title: 'Пополнение за минуту.',
    description: 'Через Kaspi — быстро и надёжно. Средства закреплены за вашей целью.',
    image: '/images/onboarding-3.png',
    showBackButton: true,
    nextButtonText: 'Начать копить'
  }
];

export const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Здесь будет переход на основной экран
      console.log('Переход на основной экран');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    // Здесь будет переход на основной экран
    console.log('Пропуск онбординга');
  };

  return (
    <div className="onboarding">
      <div className="onboarding__header">
        <img src="./logo.svg" alt="Atlas Save" className="onboarding__logo" />
        <button className="onboarding__skip-button" onClick={handleSkip}>
          Пропустить
        </button>
      </div>

      <div className="onboarding__content">
        <h1 className="onboarding__title">{slides[currentSlide].title}</h1>
        <p className="onboarding__description">{slides[currentSlide].description}</p>
        <img 
          src={slides[currentSlide].image} 
          alt={slides[currentSlide].title} 
          className="onboarding__image"
        />
      </div>

      <div className="onboarding__footer">
        {slides[currentSlide].showBackButton && (
          <button className="onboarding__back-button" onClick={handleBack}>
             <img src="/images/back.png" alt="Назад" className="onboarding__back-button-icon" />
          </button>
        )}
        <button className="onboarding__next-button" onClick={handleNext}>
          
          {slides[currentSlide].nextButtonText}
        </button>
      </div>
    </div>
  );
}; 