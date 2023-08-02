import { Box } from "@mui/material";
import { FC } from "react"

type CarbonListItemProps = {
    leftPart: React.ReactNode;
    rightPartMain: React.ReactNode;
    rightPartSecond?: React.ReactNode;
    rightPartThird?: React.ReactNode;
}

const CarbonListItem: FC<CarbonListItemProps> = ({leftPart, rightPartMain, rightPartSecond, rightPartThird}) => {
    return (
       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Box>{leftPart}</Box>
            <Box sx={{display: "flex" , alignItems: "center", gap:"10px"}}>
                <Box>{rightPartMain}</Box>
                <Box>{rightPartSecond}</Box>
                <Box>{rightPartThird}</Box>
            </Box>
       </Box> 
    )
};

export default CarbonListItem;

// exemple d'import (pour la liste d'amis)

// <Box sx={{width:'300px'}}>
//     <CarbonListItem leftPart="Alexos" rightPartMain={"105kg"} rightPartSecond={<Spa color="primary"/>} rightPartThird={<PersonRemove color="primary"/>} />
// </Box>

