import { FC } from "react"
import { IconButton, IconButtonProps } from "@mui/material";

type CarbonIconButtonProps = IconButtonProps & {
    icon: React.ReactNode;
}

const CarbonIconButton: FC<CarbonIconButtonProps> = ({icon, ...buttonProps}) => {
    return (
        <IconButton {...buttonProps}>
        {icon}
      </IconButton>
    )
};

export default CarbonIconButton;

// Exemple d'import du composant:

{/* <CarbonIconButton icon={<PersonIcon color="primary" fontSize="small"/>} onClick={handleClick}/> */}
