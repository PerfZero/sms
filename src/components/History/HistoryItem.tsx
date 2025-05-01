import React from 'react';
import { Transaction } from '../../services/api';
import './HistoryItem.css';

type HistoryItemProps = Pick<Transaction, 'iin' | 'amount' | 'name' | 'type' | 'status' | 'description'>;

const HistoryItem: React.FC<HistoryItemProps> = ({ 
  iin, 
  amount, 
  name, 
  type, 
  status, 
  description 
}) => {
  const isDeposit = type === 'DEPOSIT';
  const isPending = status === 'PENDING';
  const isFailed = status === 'FAILED';

  return (
    <div className={`history-item ${isFailed ? 'history-item--failed' : ''}`}>
      <div className="history-item__icon">
        {isPending ? (
          <span className="history-item__pending">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z" fill="#F59E0B"/>
              <path d="M12 6V12L16 14" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
        ) : isFailed ? (
          <span className="history-item__failed">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z" fill="#EF4444"/>
              <path d="M8 8L16 16M16 8L8 16" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
        ) : (
          <span className="history-item__check">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 24.4922C5.47266 24.4922 0.046875 19.0664 0.046875 12.5391C0.046875 6 5.46094 0.585938 11.9883 0.585938C18.5273 0.585938 23.9531 6 23.9531 12.5391C23.9531 19.0664 18.5391 24.4922 12 24.4922ZM12 22.5C17.5312 22.5 21.9609 18.0703 21.9609 12.5391C21.9609 7.00781 17.5195 2.57812 11.9883 2.57812C6.45703 2.57812 2.05078 7.00781 2.05078 12.5391C2.05078 18.0703 6.46875 22.5 12 22.5ZM10.7109 18.1055C10.3242 18.1055 10.0078 17.9414 9.71484 17.5547L6.85547 14.0391C6.69141 13.8164 6.58594 13.5703 6.58594 13.3125C6.58594 12.7969 6.98438 12.3867 7.48828 12.3867C7.81641 12.3867 8.07422 12.4805 8.35547 12.8555L10.6641 15.8438L15.5273 8.03906C15.75 7.69922 16.043 7.51172 16.3359 7.51172C16.8281 7.51172 17.2969 7.85156 17.2969 8.37891C17.2969 8.63672 17.1445 8.89453 17.0156 9.12891L11.6602 17.5547C11.4258 17.918 11.0977 18.1055 10.7109 18.1055Z" fill="#35C759"/>
            </svg>
          </span>
        )}
      </div>
      <div className="history-item__info">
        {/* <div className="history-item__name">{name}</div> */}
        <div className="history-item__iin">{iin}</div>
        {/* {description && <div className="history-item__description">{description}</div>} */}
      </div>
      <div className={`history-item__amount ${isDeposit ? 'history-item__amount--positive' : ''}`}>
        {isDeposit ? '+ ' : '- '}{amount.toLocaleString('ru-RU')} ₸
      </div>
      <div className="history-item__arrow">
        <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.61523 5.76953C6.61523 5.91602 6.55664 6.04492 6.44531 6.15625L1.80469 10.6973C1.69922 10.8027 1.57031 10.8555 1.41797 10.8555C1.11914 10.8555 0.884766 10.627 0.884766 10.3223C0.884766 10.1699 0.943359 10.041 1.03711 9.94141L5.30273 5.76953L1.03711 1.59766C0.943359 1.49805 0.884766 1.36328 0.884766 1.2168C0.884766 0.912109 1.11914 0.683594 1.41797 0.683594C1.57031 0.683594 1.69922 0.736328 1.80469 0.835938L6.44531 5.38281C6.55664 5.48828 6.61523 5.62305 6.61523 5.76953Z" fill="#222222"/>
        </svg>
      </div>
    </div>
  );
};

export default HistoryItem; 