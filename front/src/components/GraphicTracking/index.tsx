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

import { Box, Typography, useMediaQuery } from "@mui/material";
import CarbonCard from "../CarbonCard";
import { eachDayOfInterval } from "date-fns";
import variables from "../../variables";

export default function GraphicTracking() {
  const isPortrait = useMediaQuery("(orientation: portrait)");

  const septemberDates = eachDayOfInterval({
    start: new Date(2023, 8, 1), // 8 représente septembre (0-indexed)
    end: new Date(2023, 8, 30),
  });

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
      }}
    >
      <CarbonCard
        style={{
          backgroundColor: "white",
          border: "2px solid #3C8962",
          height: isPortrait ? "30vh" : "50vh",
          overflow: "scroll",
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
            width: "100%",
            height: "90%",
          }}
        >
          <Line data={data} />
        </Box>
      </CarbonCard>
    </Box>
  );
}
