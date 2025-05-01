import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { balanceService, goalService, type Goal } from '../../services/api';
import { SemiCircleProgress } from 'react-semicircle-progressbar';
import { RelativesList } from '../Relatives/RelativesList';
import LinearProgress from '../LinearProgress/LinearProgress';
import DepositModal from '../DepositModal/DepositModal';
import './Home.css';
// Assuming you have a progress bar component or will create one
// import ProgressBar from '../ProgressBar/ProgressBar'; 

interface Balance {
  amount: number;
  bonusAmount: number;
}

interface Transaction {
  amount: number;
  bonus?: number;
  iin: string;
  name: string;
  transactionId: string;
  timestamp: string;
  isFirstDeposit?: boolean;
}

const Home: React.FC = () => {
  const location = useLocation();
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const [showBalance, setShowBalance] = useState(true);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [familyGoals, setFamilyGoals] = useState<Goal[]>([]);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);

  const fetchData = async () => {
    try {
      const [balanceData, goalsData] = await Promise.all([
        balanceService.getBalance(),
        goalService.getAllGoals()
      ]);
      
      setBalance(balanceData as Balance);
      // Разделяем цели на личные и семейные
      const personalGoal = goalsData.find(g => !g.relativeId);
      const relativesGoals = goalsData.filter(g => g.relativeId);
      
      setGoal(personalGoal || null);
      setFamilyGoals(relativesGoals);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Проверяем наличие параметра deposit в URL
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('deposit') === 'true') {
      setIsDepositModalOpen(true);
      // Очищаем URL от параметра
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [location]);

  const toggleBalance = () => setShowBalance(!showBalance);

  const currentBalance = balance?.amount || 0;
  const currentBonus = balance?.bonusAmount || 0;
  const dollarAmount = currentBalance / 450; // Примерный курс тенге к доллару

  // Вычисляем прогресс и оставшуюся сумму
  const progressPercentage = goal ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
  const remainingAmount = goal ? goal.targetAmount - goal.currentAmount : 0;

  const handleDepositClick = (goalId?: number) => {
    setSelectedGoalId(goalId || null);
    setLastTransaction(null);
    setIsDepositModalOpen(true);
  };

  const handleDepositClose = (transaction?: Transaction) => {
    setIsDepositModalOpen(false);
    setSelectedGoalId(null);
    if (transaction) {
      setLastTransaction(transaction);
    }
    fetchData();
  };

  const handleCloseTransaction = () => {
    setLastTransaction(null);
  };

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
             
             <div className={`home__balance-card home__balance-card--active ${lastTransaction ? 'home__balance-card--success' : ''}`}>
               {lastTransaction ? (
                 <div className="home__transaction-success">
                   <div className="home__transaction-header">
                    <img src="/dones.svg" alt="Успешное пополнение" />
                     <h3 className="home__transaction-title">Успешное <br /> пополнение!</h3>
                     <button className="home__balance-toggle" onClick={handleCloseTransaction}>
                       <img src="/close.svg" alt="Закрыть" />
                     </button>
                   </div>
                   <p className="home__transaction-subtitle">Вы пополнили счёт за себя.</p>
                   <div className="home__transaction-amount">+ {lastTransaction.amount.toLocaleString()} ₸</div>
                   
                   {lastTransaction.bonus && lastTransaction.isFirstDeposit && (
                     <div className="home__transaction-bonus">
                       <div className="home__transaction-bonus-header">
                         <img src="/images/gift.svg" alt="Бонус" />
                         <h4>Бонус за первое пополнение!</h4>
                       </div>
                       <div className="home__transaction-bonus-amount">+ {lastTransaction.bonus.toLocaleString()} Б</div>
                     </div>
                   )}
                   <div className="home__transaction-details">
                     <div className="home__transaction-row">
                       <span className="home__transaction-label">ИИН плательщика</span>
                       <span className="home__transaction-value">{lastTransaction.iin}</span>
                     </div>
                     <div className="home__transaction-row">
                       <span className="home__transaction-label">ФИО плательщика</span>
                       <span className="home__transaction-value">{lastTransaction.name}</span>
                     </div>
                     <div className="home__transaction-row">
                       <span className="home__transaction-label">№ транзакции</span>
                       <span className="home__transaction-value">{lastTransaction.transactionId}</span>
                     </div>
                     <div className="home__transaction-row">
                       <span className="home__transaction-label">Дата и время</span>
                       <span className="home__transaction-value">{lastTransaction.timestamp}</span>
                     </div>
                   </div>
                 </div>
               ) : (
                 <>
                   <div className="home__balance-label-container">
                     <span className="home__balance-label--active">Ваш баланс</span>
                     
                     <button className="home__balance-toggle" onClick={toggleBalance}>
                       <img src={showBalance ? "/images/eye-open.svg" : "/images/eye-closed.svg"} alt="Toggle balance visibility" />
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
                      <div className="home__bonus-amount">
                       {showBalance ? (
                         <>{currentBonus.toLocaleString()} Б</>
                       ) : (
                         '* * * * *'
                       )}
                     </div>
                   </div>
                   <div className="home__balance-dollar-amount">
                     {showBalance ? `≈ $${dollarAmount.toLocaleString()}` : '≈ $* * * *'}
                   </div>

                   {balance && balance.amount > 0 && !goal && (
                     <div className="home__goal-wrapper">
                       <div className="home__goal-prompt">
                        <img className="home__goal-prompt-icon" src="/znak.svg" alt="" />
                         <div className="home__goal-prompt-text">
                           Вы начали копить деньги, но не выбрали цель - Умра или Хадж.
                           <br /><br />
                           <span className="home__goal-prompt-text-small">Укажите цель — Вы будете знать, сколько нужно накопить, свой прогресс и в нужный момент получите напоминание, чтобы не упустить важные шаги.</span>
                         </div>
                       </div>
                       <div className="home__goal-prompt-button">
                         <button className="home__button home__button--primary" onClick={() => window.location.href = '/self-goal-steps'}>
                           Указать цель накопления
                         </button>
                       </div>
                     </div>
                   )}

                   {goal && (
                     <>
                       <div className="home__goal-section">
                         <span className="home__balance-label--active">Ваша цель</span>
                         <div className="home__goal-details">
                           <img src="/images/homes.svg" alt="Goal icon" className="home__goal-icon" />
                           <span className="home__goal-name">{goal.type === 'UMRAH' ? 'Умра' : 'Хадж'}</span>
                           {goal.packageType && (
                             <>
                               <span className="home__goal-separator">|</span>
                               <span className="home__goal-package">{goal.packageType.charAt(0).toUpperCase() + goal.packageType.slice(1)}</span>
                             </>
                           )}
                         </div>
                       </div>

                       <div className="home__progress-section">
                        <div>
                          <SemiCircleProgress
                            percentage={Math.round(progressPercentage)}
                            size={{
                              width: 400,
                              height: 300,
                            }}
                            hasBackground={true}
                            bgStrokeColor="#ffffff50"
                            strokeWidth={10}
                            fontStyle={{
                              fontSize: '24px',
                              fontFamily: 'SF Pro Display',
                              fontWeight: 'bold',
                              fill: '#fff'
                            }}
                            strokeColor="#fff"
                          />
                        </div>
                        <div className="home__remaining-section">
                          <span className="home__remaining-label">Осталось накопить</span>
                          <div className="home__remaining-amount">
                            {remainingAmount.toLocaleString()} ₸
                            <span className="home__remaining-percentage">
                              из {goal?.targetAmount.toLocaleString()} ₸
                            </span>
                          </div>
                        </div>
                      </div>
                     </>
                   )}
                 </>
               )}
             </div>
             
             <button className="home__button home__button--primary red" onClick={() => handleDepositClick()}>
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
            
            <button className="home__button home__button--primary red" onClick={() => handleDepositClick()}>
              Пополнить счет
              <img src="/images/kaspy.svg" alt="Add" />
            </button>
          </div>
        )}

        {/* --- Раздел "Мои близкие" --- */}
        <div className="home__section">
          <h2 className="home__section-title">Ваши родные и близкие</h2>
          {familyGoals.length > 0 ? (
            <div className="home__relatives-wrapper">
              {familyGoals.map((familyGoal) => (
                <div key={familyGoal.id} className="home__relatives-card">
                  <div className="home__relative-header">
                    <div className="home__relative-relation">
                      {familyGoal.relative?.fullName}, на {familyGoal.type === 'UMRAH' ? 'Умру' : 'Хадж'}
                    </div>
                  </div>
                  
                  <div className="home__relative-balance">
                    <div className="home__relative-amount">
                      <span className="home__relative-currency">₸</span> {familyGoal.currentAmount.toLocaleString()}
                    </div>
                    <div className="home__relative-dollar">
                      ~ ${Math.round(familyGoal.currentAmount / 450).toLocaleString()}
                    </div>
                  </div>

                  <div className="home__relative-progress">
                    <div className="home__relative-percentage">
                      {Math.round((familyGoal.currentAmount / familyGoal.targetAmount) * 100)}%
                    </div>
                    <LinearProgress 
                      percentage={(familyGoal.currentAmount / familyGoal.targetAmount) * 100} 
                    />
                  </div>

                  <div className="home__relative-target">
                    <div className="home__relative-target-label">
                      Осталось до цели
                    </div>
                    <div className="home__relative-target-amount">
                      ₸ {(familyGoal.targetAmount - familyGoal.currentAmount).toLocaleString()}
                    </div>
                    <div className="home__relative-target-dollar">
                      ~ ${Math.round((familyGoal.targetAmount - familyGoal.currentAmount) / 450).toLocaleString()}
                    </div>
                  </div>

                  <button 
                    className="home__button home__button--primary red" 
                    onClick={() => handleDepositClick(familyGoal.id)}
                  >
                    Пополнить счет
                    <img src="/images/kaspy.svg" alt="Add" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="home__relatives-card">
              <div className="home__relatives-empty">
                <p>Вы пока никого не добавили...</p>
                <div className="home__balance-amounts">0%</div>
                <LinearProgress percentage={0} />
              </div>
            </div>
          )}
          
          <Link to="/family" className="home__button home__button--secondary">
            Начать копить за близкого человека
          </Link>
        </div>
      </div>

      <DepositModal 
        isOpen={isDepositModalOpen}
        onClose={handleDepositClose}
        goalId={selectedGoalId}
      />
    </div>
  );
};

export default Home; 