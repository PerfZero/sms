import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TourPackage } from '../../types';

const SaveDashboard: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const calculateProgress = () => {
    if (!currentUser?.selectedPackage) return 0;
    return (currentUser.balance / currentUser.selectedPackage.price) * 100;
  };

  const estimateTimeToComplete = () => {
    if (!currentUser?.selectedPackage) return null;
    const remaining = currentUser.selectedPackage.price - currentUser.balance;
    const monthlyContribution = 50000; // Example monthly contribution
    const months = Math.ceil(remaining / monthlyContribution);
    return months;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Atlas Safe - Накопления
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Progress Card */}
        <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Прогресс накоплений
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={calculateProgress()}
                size={120}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" component="div" color="text.secondary">
                  {`${Math.round(calculateProgress())}%`}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Package Details */}
        <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Выбранный пакет
            </Typography>
            {currentUser?.selectedPackage ? (
              <>
                <Typography variant="subtitle1">
                  {currentUser.selectedPackage.name}
                </Typography>
                <Typography variant="body1">
                  Стоимость: {currentUser.selectedPackage.price.toLocaleString()} ₸
                </Typography>
                <Typography variant="body1">
                  Отель: {currentUser.selectedPackage.hotel}
                </Typography>
              </>
            ) : (
              <Button variant="contained" color="primary">
                Выбрать пакет
              </Button>
            )}
          </Paper>
        </Box>

        {/* Balance Info */}
        <Box sx={{ width: '100%' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Информация о накоплениях
              </Typography>
              <Typography variant="body1">
                Текущий баланс: {currentUser?.balance.toLocaleString()} ₸
              </Typography>
              {currentUser?.selectedPackage && (
                <>
                  <Typography variant="body1">
                    Осталось накопить:{' '}
                    {(
                      currentUser.selectedPackage.price - currentUser.balance
                    ).toLocaleString()}{' '}
                    ₸
                  </Typography>
                  <Typography variant="body1">
                    Примерный срок накопления: {estimateTimeToComplete()} месяцев
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default SaveDashboard; 