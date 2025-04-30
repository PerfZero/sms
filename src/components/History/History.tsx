import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HistoryItem from './HistoryItem';
import './History.css';

// Мок-данные в новом формате
const mockHistory = [
  { id: 1, iin: '791212000222', amount: 100000, date: '2024-05-25' },
  { id: 2, iin: '791212000222', amount: 100000, date: '2024-05-24' },
  { id: 3, iin: '791212000222', amount: 100000, date: '2024-05-24' },
  { id: 4, iin: '791212000222', amount: 100000, date: '2024-05-24' },
  { id: 5, iin: '791212000222', amount: 100000, date: '2024-05-20' },
  { id: 6, iin: '791212000222', amount: 100000, date: '2024-05-20' },
  { id: 7, iin: '791212000222', amount: 100000, date: '2024-05-20' },
];

// Группировка по дате
const groupByDate = (items: typeof mockHistory) => {
  return items.reduce((acc: Record<string, typeof mockHistory>, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});
};

const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('ru-RU', options);
};

const History: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = mockHistory.filter(item => item.iin.includes(search));
  const grouped = groupByDate(filtered);
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="history">
      <div className="profile__header ds">
        <img src="/images/logos.svg" alt="Atlas Save" className="profile__logo" />
      </div>
      <div className="goals__header-title-container bod">
        <Link to="/goals" className="goals__back">
          ← Главная
        </Link>
        <div className="goals__header-title">История</div>
        <div className="empty-space"></div>
      </div>
      <div className="history__search-container">
        <input
          className="history__search"
          type="text"
          placeholder="Поиск по ИИН"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="history__list">
        {sortedDates.map(date => (
          <div className="history__date-group" key={date}>
            <div className="history__date-title">{formatDate(date)}</div>
            {grouped[date].map(item => (
              <HistoryItem key={item.id} iin={item.iin} amount={item.amount} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History; 