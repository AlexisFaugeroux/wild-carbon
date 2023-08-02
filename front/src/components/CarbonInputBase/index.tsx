import { FC } from 'react';
import { InputBase, InputBaseProps, useTheme } from '@mui/material';

const CarbonInputBase: FC<InputBaseProps> = ({ ...inputProps }) => {
  const { styleInputBase } = useTheme();

  return <InputBase sx={styleInputBase} placeholder="..." {...inputProps} />;
};

export default CarbonInputBase;
