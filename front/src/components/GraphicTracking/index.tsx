import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';
import { eachDayOfInterval, format } from 'date-fns';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

import { Box } from '@mui/material';
import CarbonCard from '../CarbonCard';
import variables from '../../variables';

export default function GraphicTracking() {
  const septemberDates = eachDayOfInterval({
    start: new Date(2023, 8, 1), // 8 représente septembre (0-indexed)
    end: new Date(2023, 8, 30),
  });

  const labels = septemberDates.map((date) => format(date, 'dd/MM'));
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Mes Dépenses',
        backgroundColor: 'white',
        borderColor: variables.primaryColor,
        borderWidth: 2,
        data: [30, 2, 10, 0, 50, 30, 5, 25, 16, 22, 33, 48],
      },
    ],
  };
  return (
    <CarbonCard
      title="Mes dépenses sur le mois"
      style={{
        backgroundColor: 'white',
        border: '2px solid #3C8962',
      }}
    >
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90%',
        }}
      >
        <Line data={data} />
      </Box>
    </CarbonCard>
  );
}
