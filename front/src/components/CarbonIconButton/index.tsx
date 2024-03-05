import { FC } from "react";
import { IconButton, IconButtonProps } from "@mui/material";

type CarbonIconButtonProps = IconButtonProps & {
  icon: React.ReactNode;
};

const CarbonIconButton: FC<CarbonIconButtonProps> = ({
  icon,
  ...buttonProps
}) => {
  return <IconButton {...buttonProps}>{icon}</IconButton>;
};

export default CarbonIconButton;
