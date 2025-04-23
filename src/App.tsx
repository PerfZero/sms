import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { store } from './store';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import SaveDashboard from './components/Save/SaveDashboard';
import PackageSelection from './components/Save/PackageSelection';
import Login from './components/Auth/Login';
import { RootState } from './store';
import { Onboarding } from './components/onboarding/onboarding';
import './styles/base/_reset.css';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

// Protected Route component
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Layout component with navigation
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Atlas Safe
          </Typography>
          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/">
                Главная
              </Button>
              <Button color="inherit" component={Link} to="/packages">
                Пакеты
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

// App component wrapped with providers
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute element={<SaveDashboard />} />} />
              <Route path="/packages" element={<ProtectedRoute element={<PackageSelection />} />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

function App() {
  return (
    <div className="app">
      <Onboarding />
    </div>
  );
}

export default App;
