import React from 'react';
import { Link } from 'react-router-dom';
import './Goals.css';

const Goals: React.FC = () => {
  return (
    <div className="goals">
      <div className="goals__header">
        <img src="/images/logos.svg" alt="Atlas Save" className="goals__logo" />
      </div>
      <div className="title_header">
        Цели
      </div>
      <div className="goals__content">
        <div className="goals__empty-state">
          <h2 className="goals__empty-title">Цель не выбрана</h2>
          <p className="goals__empty-description">
          Укажите, за кого копите, тип паломничества и желаемый пакет — так вы будете видеть сумму, прогресс и путь.
          </p>
          
          <div className="goals__actions">
            <Link to="/family" className="goals__button goals__button--primary">
              Начать копить на близкого
            </Link>
            <Link to="/self" className="goals__button goals__button--secondary">
              Начать копить на себя
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals; 