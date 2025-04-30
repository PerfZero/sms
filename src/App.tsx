import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { store } from './store';
import SaveDashboard from './components/Save/SaveDashboard';
import PackageSelection from './components/Save/PackageSelection';
import Login from './components/Auth/Login';
import { RootState } from './store';
import { Onboarding } from './components/onboarding/onboarding';
import { Registration } from './components/registration/Registration';
import ForgotPassword from './components/Auth/ForgotPassword';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import SelfGoalSteps from './components/Goals/SelfGoalSteps';
import FamilyGoalSteps from './components/Goals/FamilyGoalSteps';
import History from './components/History/History';

import Toolbar from './components/Toolbar/Toolbar';
import Goals from './components/Goals/Goals';
import './styles/base/_reset.css';

// Protected Route component
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  // Временно отключаем проверку аутентификации
  // const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const isAuthenticated = true; // Временное решение
  return isAuthenticated ? element : <Navigate to="/onboarding" />;
};

// Layout component with navigation
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <Toolbar />
    </>
  );
};

// App Routes component
const AppRoutes: React.FC = () => {
  // Временно отключаем проверку аутентификации
  // const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const isAuthenticated = true; // Временное решение

  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/profile"
        element={
          <Layout>
            <ProtectedRoute element={<Profile />} />
          </Layout>
        }
      />
      <Route
        path="/goals"
        element={
          <Layout>
            <ProtectedRoute element={<Goals />} />
          </Layout>
        }
      />
      <Route
        path="/self-goal-steps"
        element={
          <Layout>
            <ProtectedRoute element={<SelfGoalSteps />} />
          </Layout>
        }
      />
      <Route
        path="/family"
        element={
          <Layout>
            <ProtectedRoute element={<FamilyGoalSteps />} />
          </Layout>
        }
      />
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/packages"
        element={
          <Layout>
            <ProtectedRoute element={<PackageSelection />} />
          </Layout>
        }
      />
      <Route
        path="/history"
        element={
          <Layout>
            <ProtectedRoute element={<History />} />
          </Layout>
        }
      />
    </Routes>
  );
};

// App component wrapped with providers
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
};

export default AppWrapper;
