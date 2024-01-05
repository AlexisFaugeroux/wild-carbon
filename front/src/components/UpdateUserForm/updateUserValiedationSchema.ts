import * as Yup from 'yup';

export const updateUserSchema = Yup.object().shape({
  pseudo: Yup.string().min(3, "C'est un peu court !"),
  email: Yup.string().email('Email invalide'),
  password: Yup.string().min(3, "C'est un peu court !"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password')],
    'Les mots de passe ne sont pas identiques',
  ),
});
