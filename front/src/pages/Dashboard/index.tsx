/* eslint-disable react/no-unescaped-entities */
import { Box, Grid, Typography } from "@mui/material";
import ExpensesCard from "../../components/ExpensesCard";

import GraphicTracking from "../../components/GraphicTracking";
import AddExpenseModal from "../../components/AddExpenseModal/AddExpenseModal";
import { FriendsContextProvider } from "../../hooks/useFriendsContext";
import FriendsCard from "../../components/Friends";
import AddFriendsCard from "../../components/AddFriendsCard";
import GoodDeals from "../../components/GoodDeals";

export default function Dashboard() {
  return (
    <Box sx={{ height: "85vh" }}>
      <Typography
        variant="body1"
        sx={{
          marginTop: "0.5rem",
          marginRight: "0.5rem",
          fontFamily: "Roboto",
          textAlign: "right",
          fontStyle: "italic",
          fontSize: {
            xs: "1.1rem",
            sm: "1.2rem",
            md: "1.3rem",
            lg: "1.4rem",
            xl: "1.5rem",
          },
        }}
      >
        Bienvenue sur ton dashboard //NOM//
      </Typography>

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
        Aujourd'hui j'ai dépensé:{" "}
        <span style={{ color: "green", fontWeight: "bolder" }}> 30 kg CO²</span>
        {/*changement de la couleur du nombre à partir d'un certain seuil ? (vert orange rouge ?)*/}
      </Typography>

      <AddExpenseModal />

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <ExpensesCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraphicTracking />
        </Grid>
        <FriendsContextProvider>
          <Grid item xs={12} md={6}>
            <FriendsCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <AddFriendsCard />
          </Grid>
        </FriendsContextProvider>
        <Grid item xs={12} md={6}>
          <GoodDeals />
        </Grid>
      </Grid>
    </Box>
  );
}
