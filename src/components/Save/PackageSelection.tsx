import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { selectPackage } from '../../store/slices/userSlice';
import { TourPackage } from '../../types';

const SAMPLE_PACKAGES: TourPackage[] = [
  {
    id: '1',
    name: 'Халық',
    price: 2500000,
    description: 'Базовый пакет для Хаджа',
    type: 'Hajj',
    hotel: 'Standard Hotel',
  },
  {
    id: '2',
    name: 'Courtyard',
    price: 3500000,
    description: 'Комфортный пакет для Хаджа',
    type: 'Hajj',
    hotel: 'Courtyard by Marriott',
  },
  {
    id: '3',
    name: 'Address',
    price: 4500000,
    description: 'Премиум пакет для Хаджа',
    type: 'Hajj',
    hotel: 'Address Hotel',
  },
  {
    id: '4',
    name: 'Swissotel',
    price: 5500000,
    description: 'VIP пакет для Хаджа',
    type: 'Hajj',
    hotel: 'Swissotel',
  },
];

const PackageSelection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleSelectPackage = (pkg: TourPackage) => {
    dispatch(selectPackage(pkg));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Выберите пакет
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {SAMPLE_PACKAGES.map((pkg) => (
          <Box key={pkg.id} sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {currentUser?.selectedPackage?.id === pkg.id && (
                <Chip
                  label="Выбрано"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {pkg.name}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {pkg.price.toLocaleString()} ₸
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {pkg.description}
                </Typography>
                <Typography variant="body2">
                  Отель: {pkg.hotel}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="large"
                  variant={currentUser?.selectedPackage?.id === pkg.id ? "outlined" : "contained"}
                  color="primary"
                  fullWidth
                  onClick={() => handleSelectPackage(pkg)}
                >
                  {currentUser?.selectedPackage?.id === pkg.id
                    ? 'Выбрано'
                    : 'Выбрать пакет'}
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PackageSelection; 