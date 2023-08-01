import { FC } from "react"
import { Button, ButtonProps } from "@mui/material";

type CarbonButtonProps = ButtonProps & {
    children: React.ReactNode;
}

const CarbonButton: FC<CarbonButtonProps> = ({children, ...buttonProps}) => {
    return (
        <Button {...buttonProps}>{children}</Button>
    )
};

export default CarbonButton;