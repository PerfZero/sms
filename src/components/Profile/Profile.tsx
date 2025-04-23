import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './Profile.css';

const Profile: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  const formatBalance = (amount: number) => {
    return amount.toLocaleString();
  };

  const formatDollarAmount = (amount: number) => {
    return (amount / 450).toFixed(2); // Assuming 1 USD = 450 KZT
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <img src="/images/logos.svg" alt="Atlas Save" className="profile__logo" />
      </div>
      <div className="profile__content">
        <div className="profile__balance-section">
          <h1 className="profile__title">Ваш баланс пока пустой.</h1>
          <p className="profile__subtitle">
            Начните копить деньги на Умру или Хадж уже сегодня!
          </p>

          <div className="profile__balance-card">
            <div className="profile__balance-header">
              <span>Ваш баланс</span>
              <button 
                className="profile__balance-toggle"
                onClick={toggleBalanceVisibility}
              >
                <img 
                  src={isBalanceHidden ? "/images/yes.svg" : "/images/yes.svg"} 
                  alt={isBalanceHidden ? "Показать баланс" : "Скрыть баланс"} 
                />
              </button>
            </div>
            <div className="profile__balance-amount">
              {isBalanceHidden ? '***' : `${formatBalance(currentUser?.balance || 0)} ₸`}
            </div>
            <div className="profile__balance-dollar">
              {isBalanceHidden ? '***' : `~ $${formatDollarAmount(currentUser?.balance || 0)}`}
            </div>
          </div>

          <button className="profile__button profile__button--primary">
            Пополнить счет <img src="/images/kaspy.svg" alt="arrow" />
          </button>
        </div>

        <div className="profile__relatives-section">
          <h2 className="profile__section-title">Ваши родные и близкие</h2>
          
          <div className="profile__relatives-card">
            <div className="profile__relatives-empty">
              <p>Вы пока никого не добавили...</p>
              <span className="profile__progress-text">0%</span>

              <div className="profile__progress">
                <div className="profile__progress-bar" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>

          <button className="profile__button profile__button--secondary">
            Начать копить за близкого человека
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 