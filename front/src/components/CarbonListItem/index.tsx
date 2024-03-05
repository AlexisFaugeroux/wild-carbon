import { Box, Stack } from "@mui/material";
import { FC } from "react";

type CarbonListItemProps = {
  leftPart: React.ReactNode;
  rightPartMain: React.ReactNode;
  rightPartSecond?: React.ReactNode;
  rightPartThird?: React.ReactNode;
};

const CarbonListItem: FC<CarbonListItemProps> = ({
  leftPart,
  rightPartMain,
  rightPartSecond,
  rightPartThird,
}) => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"space-between"}
      direction={"row"}
    >
      <Box>{leftPart}</Box>
      <Stack direction={"row"} alignItems={"center"} spacing={"10px"}>
        <Box>{rightPartMain}</Box>
        <Box>{rightPartSecond}</Box>
        <Box>{rightPartThird}</Box>
      </Stack>
    </Stack>
  );
};

export default CarbonListItem;
