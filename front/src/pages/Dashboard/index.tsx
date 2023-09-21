/* eslint-disable react/no-unescaped-entities */
import { Box, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import ExpensesCard from "../../components/ExpensesCard";

import carbonAddIcon from "../../assets/carbon_add.png";

export default function Dashboard() {
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const isPortrait = useMediaQuery("(orientation: portrait)");

  return (
    <Box>
      <Box
        sx={{
          margin: "1rem 0.5rem",
          marginTop: "1rem",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Roboto",
            fontSize: {
              xs: "1rem",
              sm: "1.1rem",
              md: "1.2rem",
              lg: "1.3rem",
              xl: "1.5rem",
            },
          }}
        >
          Aujourd'hui j'ai dépensé:
          <span style={{ color: "green", fontWeight: "bolder" }}>
            {" "}
            30 kg CO²
          </span>
          {/*changement de la couleur du nombre à partir d'un certain seuil ? (vert orange rouge ?)*/}
        </Typography>

        <img src={carbonAddIcon} alt="carbonIconAdd" height="35" />
      </Box>
      <Stack
        spacing={1}
        direction={isLg && isPortrait ? "column" : "row"}
        sx={{ padding: "0 0.5rem" }}
      >
        <ExpensesCard />
      </Stack>
    </Box>
  );
}
