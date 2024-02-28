import { DirectionsCar, Restaurant, Train } from '@mui/icons-material';
import CarbonCard from '../CarbonCard';
import ExpensesListItem from '../ExpensesListItem';

export default function ExpensesCard() {
  return (
    <CarbonCard
      title="Mes dépenses carbones récentes"
      style={{
        backgroundColor: 'white',
        border: '2px solid #3C8962',
      }}
    >
      <CarbonCard.Content
        sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
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
  );
}
