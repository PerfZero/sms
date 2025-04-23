import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../../store/slices/userSlice';
import './Login.css';

interface LoginFormValues {
  iin: string;
  password: string;
  stayLoggedIn: boolean;
}

interface FormErrors {
  iin?: string;
  password?: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [iin, setIin] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleIinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) {
      setIin(value);
      setErrors(prev => ({ ...prev, iin: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors(prev => ({ ...prev, password: undefined }));
  };

  const handleStayLoggedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStayLoggedIn(e.target.checked);
  };

  const validateIin = (value: string) => {
    if (value.length !== 12) {
      return 'Введите ИИН полностью';
    }
    return undefined;
  };

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      return 'Пароль должен содержать минимум 6 символов';
    }
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    const iinError = validateIin(iin);
    const passwordError = validatePassword(password);

    if (iinError) newErrors.iin = iinError;
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(
      setUser({
        iin,
        phoneNumber: '', // We don't need phone number for login
        balance: 0,
        isFirstLogin: false,
      })
    );
    navigate('/');
  };

  const formatIin = (iin: string) => {
    if (!iin) return '';
    return iin.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  };

  return (
    <div className="registration">
      <div className="registration__header">
        <img src="images/logos.svg" alt="Atlas Save" className="registration__logo" />
      </div>

      <div className="registration__content">
        <div className="dost_image login_dost_image">
          <img src="images/dots.svg" alt="" />
        </div>
        <h1 className="registration__title login_title">Вход <br /> с аккаунтом Atlas</h1>
        <div className="registration__form">
          <div className="registration__input-group">
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formatIin(iin)}
              onChange={handleIinChange}
              placeholder="Введите свой ИИН"
              className={errors.iin ? 'error' : ''}
            />
            {errors.iin && <div className="registration__error">{errors.iin}</div>}
          </div>
          <div className="registration__input-group flex-n">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Пароль"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="registration__error">{errors.password}</div>}
          </div>
          <div className="registration__options">
            <div className="registration__checkbox">
              <input 
                type="checkbox" 
                id="stayLoggedIn" 
                checked={stayLoggedIn} 
                onChange={handleStayLoggedInChange} 
              />
              <label htmlFor="stayLoggedIn">Оставаться в системе</label>
            </div>
          
          </div>
          <div className="registration__forgot-password">
              <Link to="/forgot-password">Забыли пароль?</Link>
            </div>
          <div className="registration__login-link mn">
            <Link to="/registration">Создание аккаунта Atlas</Link>
          </div>
          <button 
            className="registration__button" 
            onClick={handleSubmit}
            disabled={!iin || !password || iin.length !== 12 || password.length < 6}
          >
            Войти
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default Login; 