import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Formik, Form } from 'formik';
import { CircularProgress, FormControl } from '@mui/material';
import CarbonInputBase from '../CarbonInputBase';
import CarbonButton from '../CarbonButton';
import { LoginQuery } from './loginQuery';
import { loginValidationSchema } from './loginValidationSchema';

interface IAuthentifcationForm {
  handleClosingPopover: () => void;
}

const AuthenticationForm: FC<IAuthentifcationForm> = ({
  handleClosingPopover,
}) => {
  const [login, { data, error }] = useLazyQuery(LoginQuery);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.login);
      handleClosingPopover();
      navigate('/');
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
        <Form onSubmit={handleSubmit}>
          {isSubmitting ?? <CircularProgress />}
          <FormControl
            sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <CarbonInputBase
              placeholder="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              className={errors.email && touched.email ? 'input-error' : ''}
            />
            {errors.email && touched.email && <p>{errors.email}</p>}

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
            {errors.password && touched.password && <p>{errors.password}</p>}

            <CarbonButton type="submit" disabled={isSubmitting}>
              Se connecter
            </CarbonButton>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default AuthenticationForm;
