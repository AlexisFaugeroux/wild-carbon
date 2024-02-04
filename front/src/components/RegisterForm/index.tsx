import { Box, CircularProgress, FormControl } from "@mui/material";
import { FC, useContext, useState } from "react";
import { Form, Formik } from "formik";

import CarbonButton from "../CarbonButton";
import CarbonInputBase from "../CarbonInputBase";
import ErrorMessage from "../LoginForm/components/ErrorMessage";
import { LoginContext } from "../../hooks/useLoginContext";
import { REGISTER } from "../../gql/UserGql";
import { registerValidationSchema } from "./registerValidationSchema";
import { routes } from "../../Navigator";
import { saveUserTokenInLocalStorage } from "../../hooks/useLoginContext/localStorage";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface IRegisterForm {
	handleClosingPopover?: () => void;
}

const RegisterForm: FC<IRegisterForm> = ({ handleClosingPopover }) => {
	const navigate = useNavigate();
	const { setIsLoggedIn, setUserId, setUserToken } = useContext(LoginContext);
	const [registerErrorMessage, setRegisterErrorMessage] = useState("");
	const [register, { error }] = useMutation(REGISTER, {
		onCompleted: (data) => {
			if (data?.register && data.register.success) {
				saveUserTokenInLocalStorage({
					userToken: data.register.token,
					userId: data.register.user.id,
				});
				setUserId(data.register.user.id);
				setUserToken(data.register.token);
				if (handleClosingPopover) {
					handleClosingPopover();
				}
				setIsLoggedIn(true);
				navigate(routes.dashboard);
			} else {
				setRegisterErrorMessage("Erreur lors de l'inscription");
			}
		},
		onError: (error) => {
			console.log("Mutation error: ", error);
		},
	});

	if (error) {
		console.log("error", error);
	}

	return (
		<Formik
			initialValues={{
				pseudo: "",
				email: "",
				password: "",
				confirmPassword: "",
			}}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				setSubmitting(true);
				register({
					variables: {
						pseudo: values.pseudo,
						email: values.email,
						password: values.password,
					},
				});
				setSubmitting(false);
				resetForm();
			}}
			validationSchema={registerValidationSchema}
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
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Form onSubmit={handleSubmit}>
						{isSubmitting ?? <CircularProgress />}
						<FormControl
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: "1rem",
								alignItems: "center",
								padding: "2rem",
							}}
						>
							<CarbonInputBase
								placeholder="Pseudo"
								id="pseudo"
								name="pseudo"
								onChange={handleChange}
								value={values.pseudo}
								className={errors.pseudo && touched.pseudo ? "input-error" : ""}
							/>
							{errors.pseudo && touched.pseudo && (
								<ErrorMessage message={errors.pseudo} />
							)}

							<CarbonInputBase
								placeholder="Email"
								id="email"
								name="email"
								onChange={handleChange}
								value={values.email}
								className={errors.email && touched.email ? "input-error" : ""}
							/>
							{errors.email && touched.email && (
								<ErrorMessage message={errors.email} />
							)}

							<CarbonInputBase
								placeholder="Mot de passe"
								id="password"
								name="password"
								type="password"
								onChange={handleChange}
								value={values.password}
								className={
									errors.password && touched.password ? "input-error" : ""
								}
							/>
							{errors.password && touched.password && (
								<ErrorMessage message={errors.password} />
							)}

							<CarbonInputBase
								placeholder="Confirmer le mot de passe"
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								onChange={handleChange}
								value={values.confirmPassword}
								className={
									errors.confirmPassword && touched.confirmPassword
										? "input-error"
										: ""
								}
							/>
							{errors.confirmPassword && touched.confirmPassword && (
								<ErrorMessage message={errors.confirmPassword} />
							)}

							{registerErrorMessage && (
								<ErrorMessage message={registerErrorMessage} />
							)}

							<CarbonButton type="submit" disabled={isSubmitting}>
								Créer son compte
							</CarbonButton>

							{error && <ErrorMessage message="Erreur lors de l'inscription" />}
						</FormControl>
					</Form>
				</Box>
			)}
		</Formik>
	);
};

export default RegisterForm;