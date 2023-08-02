import { CardContent, CardContentProps } from "@mui/material";
import { FC } from "react";

type CarbonCardContentProps = CardContentProps & {
    children: React.ReactNode;
}

const CarbonCardContent: FC<CarbonCardContentProps> = ({children, ...props}) => {
    return (
        <CardContent {...props}>
            {children}
        </CardContent>
    )
}

export default CarbonCardContent;