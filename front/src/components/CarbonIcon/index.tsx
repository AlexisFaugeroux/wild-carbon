import { FC } from "react"
import { Icon, IconProps } from "@mui/material";
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

type CarbonIconProps = IconProps & {
    children: React.ReactNode;
}

const CarbonIcon: FC<CarbonIconProps> = ({children}) => {
    return (
        <Icon>{children}</Icon>
    )
};

export default CarbonIcon;