import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Formik, Form } from 'formik';
import { Box, CircularProgress, FormControl } from '@mui/material';
import CarbonInputBase from '../CarbonInputBase';
import CarbonButton from '../CarbonButton';
import ErrorMessage from './components/ErrorMessage';
import { LoginQuery } from './loginQuery';
import { loginValidationSchema } from './loginValidationSchema';
import { saveUserTokenInLocalStorage } from '../../hooks/useLoginContext/localStorage';
import { routes } from '../../Navigator';

interface IAuthentifcationForm {
  handleClosingPopover?: () => void;
}

const AuthenticationForm: FC<IAuthentifcationForm> = ({
  handleClosingPopover,
}) => {
  const [login, { data, error }] = useLazyQuery(LoginQuery);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      saveUserTokenInLocalStorage({ userToken: data.login });
      if (handleClosingPopover) {
        handleClosingPopover();
      }
      navigate(routes.dashboard);
    }
  }, [data]);

  if (error) {
    console.log('error', error);
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        login({
          variables: { email: values.email, password: values.password },
        });
        setSubmitting(false);
        resetForm();
      }}
      validationSchema={loginValidationSchema}
    >
      {({
        errors,
        values,
        touched,
        isSubmitting,
        handleChange,
        handleSubmit,
      }): JSX.Element => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: {
              md: '33%',
            },
          }}
        >
          <Form onSubmit={handleSubmit}>
            {isSubmitting ?? <CircularProgress />}
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <CarbonInputBase
                placeholder="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                className={errors.email && touched.email ? 'input-error' : ''}
              />
              {errors.email && touched.email && (
                <ErrorMessage message={errors.email} />
              )}

              <CarbonInputBase
                placeholder="Mot de passe"
                id="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                className={
                  errors.password && touched.password ? 'input-error' : ''
                }
              />
              {errors.password && touched.password && (
                <ErrorMessage message={errors.password} />
              )}

              <CarbonButton type="submit" disabled={isSubmitting}>
                Se connecter
              </CarbonButton>

              {error && (
                <ErrorMessage message="Identifiants de connexion invalides" />
              )}
            </FormControl>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default AuthenticationForm;
