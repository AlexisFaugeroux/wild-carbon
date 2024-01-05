import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import CarbonButton from '../../../components/CarbonButton';
import CarbonIconButton from '../../../components/CarbonIconButton';
import variables from '../../../variables';

interface InputTogglerProps {
  inputName: string;
  innerText: string;
  activeInputs: string[];
  setActiveInputs: Dispatch<SetStateAction<string[]>>;
  children: ReactNode;
}

const InputToggler: FC<InputTogglerProps> = ({
  inputName,
  innerText,
  activeInputs,
  setActiveInputs,
  children,
}) => {
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const getCorrectIcon = (inputName: string): JSX.Element => {
    return inputName === 'pseudo' ? (
      <AssignmentIndIcon fontSize="large" color="secondary" />
    ) : inputName === 'email' ? (
      <EmailIcon fontSize="large" color="secondary" />
    ) : inputName === 'password' ? (
      <VpnKeyIcon fontSize="large" color="secondary" />
    ) : (
      <EditTwoToneIcon fontSize="large" color="secondary" />
    );
  };

  return (
    <Stack direction="column" width="100%" spacing={2}>
      <Stack direction="row" alignItems="center">
        <Stack direction="row" alignItems="center" width="85%" spacing={2}>
          <CarbonIconButton icon={getCorrectIcon(inputName)} />
          <Stack direction="row">
            <Typography
              sx={{
                color: variables.thirdColor,
                fontSize: '1.1rem',
              }}
            >
              {inputName !== 'password'
                ? `Ton ${inputName} : ${innerText}`
                : 'Mot de passe'}
            </Typography>
          </Stack>
        </Stack>
        {!isLg ? (
          <CarbonIconButton
            icon={
              !activeInputs.includes(inputName) && (
                <EditTwoToneIcon fontSize="large" color="secondary" />
              )
            }
            onClick={() => setActiveInputs([...activeInputs, inputName])}
          />
        ) : (
          !activeInputs.includes(inputName) && (
            <CarbonButton
              type="button"
              onClick={() => setActiveInputs([...activeInputs, inputName])}
            >
              Modifier
            </CarbonButton>
          )
        )}
      </Stack>
      {children}
    </Stack>
  );
};

export default InputToggler;
