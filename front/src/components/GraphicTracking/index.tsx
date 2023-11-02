import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { format } from "date-fns";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

import { Box, Typography, useMediaQuery, Theme } from "@mui/material";
import CarbonCard from "../CarbonCard";
import { eachDayOfInterval } from "date-fns";
import variables from "../../variables";

export default function GraphicTracking() {
  const septemberDates = eachDayOfInterval({
    start: new Date(2023, 8, 1), // 8 représente septembre (0-indexed)
    end: new Date(2023, 8, 30),
  });

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

  const labels = septemberDates.map((date) => format(date, "dd/MM"));
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Mes Dépenses",
        backgroundColor: "white",
        borderColor: variables.primaryColor,
        borderWidth: 2,
        data: [30, 2, 10, 0, 50, 30, 5, 25, 16, 22, 33, 48],
      },
    ],
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
      <CarbonCard
        style={{
          backgroundColor: "white",
          border: "2px solid #3C8962",
          height: calculateHeight(),
          margin: 0,
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
          Mes dépenses sur le mois:
        </Typography>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "90%",
          }}
        >
          <Line data={data} />
        </Box>
      </CarbonCard>
    </Box>
  );
}
