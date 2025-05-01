import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../../store/slices/userSlice';
import { authService, userService } from '../../services/api';
import { User } from '../../types';
import './Login.css';
import { AuthResponse } from '../../services/api';

interface LoginResponse {
  message: string;
  token: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [iin, setIin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleIinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) setIin(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (iin.length !== 12) {
      setError('Введите ИИН полностью');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
      setIsLoading(true);
      const response = await authService.login(iin, password) as AuthResponse;
      
      // Сохраняем токен
      localStorage.setItem('token', response.token);
      
      // Получаем данные пользователя после успешного входа
      try {
        const profileData = await userService.getProfile();
        const userData: User = {
          iin: profileData.iin,
          phoneNumber: profileData.phone,
          balance: profileData.balance?.amount || 0,
          isFirstLogin: false,
          role: profileData.role === 'ADMIN' ? 'ADMIN' : 'USER',
          name: profileData.name || ''
        };
        dispatch(setUser(userData));
        navigate('/');
      } catch (profileErr) {
        setError('Ошибка при получении данных пользователя');
      }
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration">
      <div className="registration__header">
        <img src="images/logos.svg" alt="Atlas Save" className="registration__logo" />
      </div>
      <div className="registration__content">
        <h1 className="registration__title login_title">Вход с аккаунтом Atlas</h1>
        <div className="registration__form">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="registration__input-group">
              <input
                type="text"
                className="registration__input"
                placeholder="ИИН"
                value={iin}
                onChange={handleIinChange}
                maxLength={12}
              />
            </div>
            <div className="registration__input-group">
              <input
                type="password"
                className="registration__input"
                placeholder="Пароль"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              type="submit"
              className="registration__button"
              disabled={isLoading}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
            <div className="registration__login-link">
              <Link to="/registration">Нет аккаунта? Зарегистрироваться</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 