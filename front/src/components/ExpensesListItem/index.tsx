import { FC } from "react";

import { Icon, Stack, Typography } from "@mui/material";

import carbonlogo from "../../assets/leaf.png";
import variables from "../../variables";

type ExpensesListItemProps = {
  IconExpense: React.ElementType;
  name: React.ReactNode;
  date: React.ReactNode;
  expenseNumber: React.ReactNode;
};

const ExpensesListItem: FC<ExpensesListItemProps> = ({
  IconExpense,
  name,
  date,
  expenseNumber,
}) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Icon
        component={IconExpense}
        fontSize="large"
        sx={{ color: variables.thirdColor }}
      />

      <Stack direction="column" alignItems="center" justifyContent="center">
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontFamily: "Roboto",
            fontSize: {
              xs: "0.80rem",
              sm: "0.85rem",
              md: "1rem",
              lg: "1.3rem",
              xl: "1.5rem",
            },
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: variables.thirdColor,
            fontFamily: "Roboto",
            fontSize: {
              xs: "0.75rem",
              sm: "0.75rem",
              md: "1rem",
              lg: "1rem",
              xl: "1rem",
            },
          }}
        >
          {date}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        alignItems="baseline"
      >
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Roboto",
          }}
        >
          <span
            style={{
              color: variables.secondaryColor,
              fontWeight: "bold",
            }}
          >
            {expenseNumber}{" "}
          </span>
          kg
          <span style={{ color: variables.secondaryColor }}> CO²</span>
        </Typography>
        <img src={carbonlogo} alt="carbon leaf" height="20" />
      </Stack>
    </Stack>
  );
};

export default ExpensesListItem;
