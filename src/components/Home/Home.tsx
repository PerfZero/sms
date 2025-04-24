import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SemiCircleProgress } from 'react-semicircle-progressbar';
import { RelativesList } from '../Relatives/RelativesList';
import './Home.css';
// Assuming you have a progress bar component or will create one
// import ProgressBar from '../ProgressBar/ProgressBar'; 

const Home: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [showBalance, setShowBalance] = useState(true);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  // Примерные данные для цели (замените на реальные данные из state)
  const goal = {
    name: 'Умра',
    targetAmount: 30000, // Примерная целевая сумма
    premiumPackage: true, // Пример
  };

  const currentBalance = currentUser?.balance || 10000;
  const dollarAmount = Math.round(currentBalance / 450); // Примерный курс
  const progressPercentage = goal.targetAmount > 0 ? Math.round((currentBalance / goal.targetAmount) * 100) : 0;
  const remainingAmount = Math.max(0, goal.targetAmount - currentBalance);

  return (
    <div className="home">
      <div className="home__header">
        <img src="/images/logos.svg" alt="Atlas Save" className="home__logo" />
      </div>
      
      <div className="home__content">
        {currentBalance > 0 ? (
          // --- Блок когда есть баланс (как на скрине) ---
          <div className="home__balance-section home__balance-section--active">
             <div className="home__greeting">
               Ассаляму Алейкум, <br />
               <strong>{currentUser?.name || 'Пользователь'}!</strong> 
             </div>
             
             <div className="home__balance-card home__balance-card--active">
               <div className="home__balance-label-container">
                 <span className="home__balance-label home__balance-label--active">Ваш баланс</span>
                 <button className="home__balance-toggle" onClick={toggleBalance}>
                   <img src={showBalance ? "/images/yes.svg" : "/images/yes.svg"} alt="Toggle balance" /> 
                 </button>
               </div>

                
             
                <div className="home__balance-amount">
                 {showBalance ? (
                   <>
                     <span className="home__balance-currency">₸</span> {currentBalance.toLocaleString()}
                   </>
                 ) : (
                   '* * * * *'
                 )}
               </div>
               <div className="home__balance-dollar-amount">
                 {showBalance ? `≈ $${dollarAmount.toLocaleString()}` : '≈ $* * * *'}
               </div>
               
               <div className="home__goal-section">
                 <span className="home__balance-label home__balance-label--active">Ваша цель</span>
                 <div className="home__goal-details">
                   <img src="/images/homes.svg" alt="Goal icon" className="home__goal-icon" /> {/* Иконка цели */}
                   <span className="home__goal-name">{goal.name}</span>
                   {goal.premiumPackage && (
                     <>
                       <span className="home__goal-separator">|</span>
                       <span className="home__goal-package">Premium Package {'>'}</span>
                     </>
                   )}
                 </div>
               </div>

               <div className="home__progress-section">
                 <div className="progress-wrapper">
                   <SemiCircleProgress
                     percentage={progressPercentage}
                     size={{
                       width: 400,
                       height: 350
                     }}
                     strokeWidth={10}
                     strokeColor="#FFFFFF"
                     strokeLinecap="round"
                     hasBackground={true}
                     bgStrokeColor="rgba(255, 255, 255, 0.1)"
                     fontStyle={{
                       fontSize: '18px',
                       fontFamily: 'inherit',
                       fontWeight: '600',
                       fill: '#FFFFFF'
                     }}
                   />
                 </div>
                 <div className="home__remaining-section">
                   <span className="home__remaining-label">Осталось накопить</span>
                   <div className="home__remaining-amount">
                     {remainingAmount.toLocaleString()} ₸
                     <span className="home__remaining-percentage">≈ $2</span>
                   </div>
                 </div>
               </div>
             </div>
             
             <button className="home__button home__button--primary">
               Пополнить счет
               <img src="/images/kaspy.svg" alt="Add" />
             </button>
          </div>
        ) : (
          // --- Блок когда баланс пустой ---
          <div className="home__balance-section">
            <h2 className="home__title">Ваш баланс пока пустой.</h2>
            <p className="home__subtitle">Начните копить деньги на Умру или Хадж уже сегодня!</p>
            
            <div className="home__balance-card">
              {/* Содержимое карточки для пустого баланса остается как было, */}
              {/* или можно упростить, если нужно */}
               <div className="home__balance-header">
                 <span>Текущий баланс</span>
                 {/* Кнопка скрытия тут не нужна, если баланс 0 */}
               </div>
               <div className="home__balance-amount">
                 0 <span className="home__balance-dollar">₸</span>
               </div>
               <div className="home__balance-dollar-amount">
                 ~ $0
               </div>
            </div>
            
            <button className="home__button home__button--primary">
              Пополнить счет
              <img src="/images/kaspy.svg" alt="Add" />
            </button>
          </div>
        )}

        {/* --- Раздел "Мои близкие" остается ниже --- */}
        <div className="home__section">
          <h2 className="home__section-title">Мои близкие</h2>
          <div className="home__relatives-card">
            <div className="home__relatives-empty">
              <p>У вас пока нет добавленных близких</p>
              <div className="home__balance-amounts">0%</div>
            </div>
          </div>
        </div>
     
        <button className="home__button home__button--secondary">
          Начать копить за близкого человека
        </button>
      </div>

      <RelativesList />
    </div>
  );
};

export default Home; 