import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import theme from '../../theme';

type CarbonButtonProps = ButtonProps & {
  children: React.ReactNode;
};

const CarbonButton: FC<CarbonButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <Button {...buttonProps} variant="contained">
      {children}
    </Button>
  );
};

export default CarbonButton;
