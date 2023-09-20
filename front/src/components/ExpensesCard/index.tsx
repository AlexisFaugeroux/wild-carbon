import { Box, Typography } from "@mui/material";

import CarbonCard from "../CarbonCard";
import ExpensesListItem from "../ExpensesListItem";
import {
  DirectionsCar,
  DirectionsRun,
  Restaurant,
  Train,
} from "@mui/icons-material";

export default function ExpensesCard() {
  return (
    <Box sx={{ width: "100%" }}>
      <CarbonCard
        // title="Mes dépenses carbones récentes:"
        style={{
          backgroundColor: "white",
          border: "2px solid #3C8962",
          height: "30vh",
          overflow: "scroll",
        }}
        sx={{
          width: {
            xs: "100%",
            sm: "50%",
            md: "50%",
          },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            fontFamily: "Roboto",
            fontSize: {
              xs: "0.85rem",
              sm: "0.95rem",
              md: "1.1rem",
              lg: "1.3rem",
              xl: "1.5rem",
            },
          }}
        >
          Mes dépenses carbones récentes:
        </Typography>
        <CarbonCard.Content
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <ExpensesListItem
            IconExpense={DirectionsCar}
            name="Trajet voiture"
            date="20 septembre"
            expenseNumber="30"
          />
          <ExpensesListItem
            IconExpense={Restaurant}
            name="Mcdo"
            date="10 septembre"
            expenseNumber="2"
          />
          <ExpensesListItem
            IconExpense={Train}
            name="Train Lille-Paris"
            date="05 septembre"
            expenseNumber="10"
          />
          <ExpensesListItem
            IconExpense={DirectionsRun}
            name="Course à pied"
            date="04 septembre"
            expenseNumber="0"
          />
          <ExpensesListItem
            IconExpense={DirectionsCar}
            name="Trajet voiture"
            date=" 01 septembre"
            expenseNumber="50"
          />
        </CarbonCard.Content>
      </CarbonCard>
    </Box>
  );
}
