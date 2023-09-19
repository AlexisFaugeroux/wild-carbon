import { FC } from "react";
import { TextField, TextFieldProps, useTheme } from "@mui/material";

const CarbonInputBase: FC<TextFieldProps> = ({ ...inputProps }) => {
  const { styleInputBase } = useTheme();

  return (
    <TextField
      sx={styleInputBase}
      size="small"
      placeholder="..."
      {...inputProps}
    />
  );
};

export default CarbonInputBase;
