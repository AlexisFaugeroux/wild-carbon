import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  CircularProgress,
  Divider,
  FormControl,
  Stack,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import profilePic from '../../assets/feels-good.png';
import { GET_USER, UPDATE_USER } from '../../gql/UserGql';
import InputToggler from '../../pages/ProfilePage/components/InputToggler';
import { UserType } from '../../types/user';
import CarbonButton from '../CarbonButton';
import CarbonInputBase from '../CarbonInputBase';
import ErrorMessage from '../LoginForm/components/ErrorMessage';
import { updateUserSchema } from './updateUserValiedationSchema';

interface UpdateUserFormValues {
  pseudo: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface UpdateUserFormProps {
  userId: string;
}

interface GetUserQueryResponse {
  userData: UserType;
}

const UpdateUserForm: FC<UpdateUserFormProps> = ({ userId }) => {
  const [activeInputs, setActiveInputs] = useState<string[]>([]);

  const { data } = useQuery<GetUserQueryResponse>(GET_USER, {
    variables: { id: userId },
    onError: (error) => {
      console.error('Query error: ', error);
    },
  });

  const [updateUser] = useMutation<UserType>(UPDATE_USER, {
    refetchQueries: [GET_USER, 'GetUser'],
    onError: (error) => {
      console.error('Mutation error: ', error);
    },
  });

  const getValuesToUpdate = (values: UpdateUserFormValues) => {
    return Object.entries(values).reduce(
          (acc, [key, value]) => {
            if (key === 'passwordConfirm') return acc;

            if (key === 'password') {
              const hasChanged = value !== '';
              if (hasChanged) {
                acc.password = value;
              }
              return acc;
            }

            const hasChanged = value !== data?.userData[key];
            if (hasChanged) {
              acc[key as keyof UpdateUserFormValues] = value;
            }
            return acc;
          },
          {} as UpdateUserFormValues,
        )
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        pseudo: data?.userData.pseudo ?? '',
        email: data?.userData.email ?? '',
        password: '',
        passwordConfirm: '',
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const valuesToUpdate = getValuesToUpdate(values);
        updateUser({
          variables: {
            id: userId,
            ...valuesToUpdate,
          },
        });
        setSubmitting(false);
        resetForm();
      }}
      validationSchema={updateUserSchema}
    >
      {({
        initialValues,
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleSubmit,
        resetForm,
      }): JSX.Element => (
        <Form
          style={{
            width: '100%',
          }}
          onSubmit={handleSubmit}
        >
          {isSubmitting ?? <CircularProgress />}
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              alignItems="center"
              sx={{ width: '100%', maxWidth: { xs: 650 } }}
            >
              <Avatar
                src={profilePic}
                alt="Profile picture"
                sx={{
                  backgroundColor: 'black',
                  height: 140,
                  width: 140,
                  maxHeight: { xs: 140, md: 250 },
                  maxWidth: { xs: 140, md: 250 },
                }}
              />

              <Divider orientation="horizontal" flexItem />

              <InputToggler
                inputName="pseudo"
                innerText={initialValues.pseudo ?? ''}
                activeInputs={activeInputs}
                setActiveInputs={setActiveInputs}
              >
                {activeInputs.includes('pseudo') && (
                  <>
                    <CarbonInputBase
                      sx={{
                        width: '100%',
                      }}
                      placeholder={values.pseudo}
                      id="pseudo"
                      name="pseudo"
                      onChange={handleChange}
                      value={values.pseudo}
                      className={
                        errors.pseudo && touched.pseudo ? 'input-error' : ''
                      }
                    />
                    {errors.pseudo && touched.pseudo && (
                      <ErrorMessage
                        message={
                          errors.pseudo ?? 'Cannot display error message'
                        }
                      />
                    )}
                    <Stack direction="row" justifyContent="center" gap={2}>
                      <CarbonButton
                        type="button"
                        color="error"
                        onClick={() => {
                          resetForm();
                          setActiveInputs(
                            activeInputs.filter(
                              (inputName) => inputName !== 'pseudo',
                            ),
                          );
                        }}
                        style={{
                          width: '150px',
                        }}
                      >
                        Annuler
                      </CarbonButton>
                      <CarbonButton
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          width: '150px',
                        }}
                      >
                        Enregistrer
                      </CarbonButton>
                    </Stack>
                  </>
                )}
              </InputToggler>

              <Divider orientation="horizontal" flexItem />

              <InputToggler
                inputName="email"
                innerText={initialValues.email ?? ''}
                activeInputs={activeInputs}
                setActiveInputs={setActiveInputs}
              >
                {activeInputs.includes('email') && (
                  <>
                    <CarbonInputBase
                      sx={{
                        width: '100%',
                      }}
                      placeholder={values.email}
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      className={
                        errors.email && touched.email ? 'input-error' : ''
                      }
                    />
                    {errors.email && touched.email && (
                      <ErrorMessage
                        message={errors.email ?? 'Cannot display error message'}
                      />
                    )}
                    <Stack direction="row" justifyContent="center" gap={2}>
                      <CarbonButton
                        type="button"
                        color="error"
                        onClick={() => {
                          resetForm();
                          setActiveInputs(
                            activeInputs.filter(
                              (inputName) => inputName !== 'email',
                            ),
                          );
                        }}
                        style={{
                          width: '150px',
                        }}
                      >
                        Annuler
                      </CarbonButton>
                      <CarbonButton
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          width: '150px',
                        }}
                      >
                        Enregistrer
                      </CarbonButton>
                    </Stack>
                  </>
                )}
              </InputToggler>

              <Divider orientation="horizontal" flexItem />

              <InputToggler
                inputName="password"
                innerText={initialValues.password ?? ''}
                activeInputs={activeInputs}
                setActiveInputs={setActiveInputs}
              >
                {activeInputs.includes('password') && (
                  <>
                    <CarbonInputBase
                      label="Nouveau mot de passe"
                      type="password"
                      sx={{
                        width: '100%',
                      }}
                      placeholder={values.password}
                      id="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      className={
                        errors.password && touched.password ? 'input-error' : ''
                      }
                    />
                    {errors.password && touched.password && (
                      <ErrorMessage
                        message={
                          errors.password ?? 'Cannot display error message'
                        }
                      />
                    )}
                    <CarbonInputBase
                      label="Confirmation mot de passe"
                      type="password"
                      sx={{
                        width: '100%',
                      }}
                      placeholder={values.passwordConfirm}
                      id="passwordConfirm"
                      name="passwordConfirm"
                      onChange={handleChange}
                      value={values.passwordConfirm}
                      className={
                        errors.passwordConfirm && touched.passwordConfirm
                          ? 'input-error'
                          : ''
                      }
                    />
                    {errors.passwordConfirm && touched.passwordConfirm && (
                      <ErrorMessage
                        message={
                          errors.passwordConfirm ??
                          'Cannot display error message'
                        }
                      />
                    )}
                    <Stack direction="row" justifyContent="center" gap={2}>
                      <CarbonButton
                        type="button"
                        color="error"
                        onClick={() => {
                          resetForm();
                          setActiveInputs(
                            activeInputs.filter(
                              (inputName) => inputName !== 'password',
                            ),
                          );
                        }}
                        style={{
                          width: '150px',
                        }}
                      >
                        Annuler
                      </CarbonButton>
                      <CarbonButton
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          width: '150px',
                        }}
                      >
                        Enregistrer
                      </CarbonButton>
                    </Stack>
                  </>
                )}
              </InputToggler>
            </Stack>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateUserForm;
