import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { balanceService } from '../../services/api';
import './DepositModal.css';

interface DepositModalProps {
  isOpen: boolean;
  onClose: (transaction?: any) => void;
  goalId?: number | null;
  goalInfo?: {
    relativeName: string;
    targetAmount: number;
    currentAmount: number;
  };
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, goalId, goalInfo }) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    setIsLoading(true);
    try {
      const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
      const response = await balanceService.deposit(numericAmount, goalId);
      setLastTransaction(response.transaction);
      setSuccess(true);
    } catch (error) {
      console.error('Error making deposit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      const numericValue = parseInt(value);
      setAmount(numericValue.toLocaleString());
    } else {
      setAmount('');
    }
  };

  const handleClose = () => {
    onClose(lastTransaction);
    setAmount('');
    setSuccess(false);
    setLastTransaction(null);
  };

  if (success && lastTransaction) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="deposit-modal">
          <div className="deposit-modal__success">
            <h2>Успешно!</h2>
            <p>Ваш счет пополнен на:</p>
            <div className="deposit-modal__amount">
              {lastTransaction.amount.toLocaleString()} ₸
            </div>

            {lastTransaction.goal && (
              <div className="deposit-modal__goal-info">
                <p>Средства зачислены на цель:</p>
                <strong>{lastTransaction.goal.relativeName}</strong>
                <div className="deposit-modal__progress">
                  <div>Прогресс цели:</div>
                  <div>{Math.round((lastTransaction.goal.currentAmount / lastTransaction.goal.targetAmount) * 100)}%</div>
                </div>
              </div>
            )}

            {lastTransaction.isFirstDeposit && lastTransaction.bonus && (
              <div className="deposit-modal__bonus">
                <div className="deposit-modal__bonus-header">
                  <img src="/images/gift.svg" alt="Bonus" />
                  <h4>Бонус за первое пополнение!</h4>
                </div>
                <div className="deposit-modal__bonus-amount">
                  +{lastTransaction.bonus.toLocaleString()} ₸
                </div>
              </div>
            )}

            <button className="deposit-modal__submit" onClick={handleClose}>
              Закрыть
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <div className="deposit-modal">
        <h2 className="deposit-modal__title">
          {goalInfo ? `Пополнение цели: ${goalInfo.relativeName}` : 'Пополнение счета'}
        </h2>
        
        {goalInfo && (
          <div className="deposit-modal__goal-summary">
            <div className="deposit-modal__goal-progress">
              <div className="deposit-modal__goal-label">Прогресс цели:</div>
              <div className="deposit-modal__goal-percentage">
                {Math.round((goalInfo.currentAmount / goalInfo.targetAmount) * 100)}%
              </div>
            </div>
            <div className="deposit-modal__goal-remaining">
              <div className="deposit-modal__goal-label">Осталось собрать:</div>
              <div className="deposit-modal__goal-amount">
                {(goalInfo.targetAmount - goalInfo.currentAmount).toLocaleString()} ₸
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="deposit-modal__input-group">
            <input
              type="text"
              value={amount ? `${amount} ₸` : ''}
              onChange={handleAmountChange}
              placeholder="Введите сумму"
              className="deposit-modal__input"
            />
          </div>
          <button
            type="submit"
            className="deposit-modal__submit"
            disabled={!amount || isLoading}
          >
            {isLoading ? 'Обработка...' : 'Пополнить'}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default DepositModal; 