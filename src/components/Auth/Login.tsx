import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
} from '@mui/material';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { setUser } from '../../store/slices/userSlice';

interface LoginFormValues {
  iin: string;
  phoneNumber: string;
}

const validationSchema = Yup.object({
  iin: Yup.string()
    .required('ИИН обязателен')
    .length(12, 'ИИН должен содержать 12 цифр')
    .matches(/^\d+$/, 'ИИН должен содержать только цифры'),
  phoneNumber: Yup.string()
    .required('Номер телефона обязателен')
    .matches(/^\+?7\d{10}$/, 'Введите корректный номер телефона'),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: LoginFormValues) => {
    dispatch(
      setUser({
        iin: values.iin,
        phoneNumber: values.phoneNumber,
        balance: 0,
        isFirstLogin: true,
      })
    );
    navigate('/');
  };

  const initialValues: LoginFormValues = {
    iin: '',
    phoneNumber: '',
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Вход в Atlas Safe
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" paragraph>
            Введите ваш ИИН и номер телефона для входа
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
            }: FormikProps<LoginFormValues>) => (
              <Form>
                <TextField
                  fullWidth
                  id="iin"
                  name="iin"
                  label="ИИН"
                  value={values.iin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.iin && Boolean(errors.iin)}
                  helperText={touched.iin && errors.iin}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Номер телефона"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  margin="normal"
                  placeholder="+7XXXXXXXXXX"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 3 }}
                >
                  Войти
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 