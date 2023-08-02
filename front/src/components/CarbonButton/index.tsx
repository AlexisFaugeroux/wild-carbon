import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { grey } from '@mui/material/colors';

type CarbonButtonProps = ButtonProps & {
  children: React.ReactNode;
};

const CarbonButton: FC<CarbonButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <Button {...buttonProps} sx={{ color: grey[50] }} variant="contained">
      {children}
    </Button>
  );
};

export default CarbonButton;
