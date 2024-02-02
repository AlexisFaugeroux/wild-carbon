import { Box, Theme, Typography, useMediaQuery } from "@mui/material";

import CarbonCard from "../CarbonCard";
import ExpensesListItem from "../ExpensesListItem";
import { DirectionsCar, Restaurant, Train } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ExpensesCard() {
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const calculateHeight = () => {
    if (isLg) {
      return "30vh";
    } else if (isPortrait) {
      return "25vh";
    } else if (isLandscape) {
      return "45vh";
    }
  };

  return (
    <Link to="/my-expenses" style={{ textDecoration: "none", width: "100%" }}>
      <Box>
        <CarbonCard
          style={{
            backgroundColor: "white",
            border: "2px solid #3C8962",
            margin: 0,
            height: calculateHeight(),
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
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
          </CarbonCard.Content>
        </CarbonCard>
      </Box>
    </Link>
  );
}
