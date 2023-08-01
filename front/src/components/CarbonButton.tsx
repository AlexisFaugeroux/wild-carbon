import { FC } from "react"
import { Button, ButtonProps } from "@mui/material";
import theme from "../theme";

type CarbonButtonProps = ButtonProps & {
    children: React.ReactNode;
}

const CarbonButton: FC<CarbonButtonProps> = ({children, ...buttonProps}) => {
    return (
        <Button 
            {...buttonProps}
            sx={{
                border: "solid",
                borderWidth: "1px",
            }}
        >{children}</Button>
    )
};

export default CarbonButton;