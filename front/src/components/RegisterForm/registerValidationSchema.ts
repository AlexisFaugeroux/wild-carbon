import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Champ requis"),
    password: Yup.string()
        .min(3, "C'est un peu court !")
        .required("Champ requis"),
});