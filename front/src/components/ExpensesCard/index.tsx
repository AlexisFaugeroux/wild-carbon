import { useContext, useEffect, useState } from "react";
import CarbonCard from "../CarbonCard";
import ExpensesListItem from "../ExpensesListItem";
import {
  Bolt,
  House,
  QuestionMark,
  Restaurant,
  Train,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { LoginContext } from "../../hooks/useLoginContext";
import { useQuery } from "@apollo/client";
import { ExpenseType } from "../../types/expense";
import { GET_EXPENSE_BY_USER_ID } from "../../gql/ExpenseGql";
import { Categories } from "../../types/categoriesEnum";
import variables from "../../variables";

export default function ExpensesCard() {
  const { userId } = useContext(LoginContext);
  const [latestExpenses, setLatestExpenses] = useState<ExpenseType[]>([]);

  const { data: dataExpenses } = useQuery<{
    getAllExpensesByUserId: ExpenseType[];
  }>(GET_EXPENSE_BY_USER_ID, {
    variables: {
      userId,
    },
  });

  const handleLatestExpense = () => {
    const expenses = dataExpenses?.getAllExpensesByUserId;
    if (expenses) {
      const sortedData = expenses.slice().sort((a, b) => {
        const timestampA = a && a.expenseDate ? parseInt(a.expenseDate) : 0;
        const timestampB = b && b.expenseDate ? parseInt(b.expenseDate) : 0;
        return timestampB - timestampA;
      });
      const filteredData = sortedData.slice(0, 3);

      return filteredData;
    }
    return [];
  };

  const formattedDate = (date: string | undefined) => {
    const timestamp = date;
    if (timestamp) {
      const formattedDate = new Date(Number(timestamp)).toLocaleDateString(
        "fr-FR",
        {
          day: "2-digit",
          month: "long",
        }
      );
      return formattedDate;
    }
  };

  useEffect(() => {
    const filteredData = handleLatestExpense();
    setLatestExpenses(filteredData);
  }, [dataExpenses]);

  return (
    <Link to="/my-expenses" style={{ textDecoration: "none" }}>
      <CarbonCard
        title="Mes dépenses carbones récentes"
        style={{
          backgroundColor: "white",
          border: "2px solid #3C8962",
        }}
        sx={{
          padding: 2,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
          },
        }}
      >
        <CarbonCard.Content
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {latestExpenses?.map((cat) => {
            let icon;
            switch (cat.item.category.name) {
              case Categories.FOOD:
                icon = (
                  <Restaurant
                    fontSize="large"
                    sx={{
                      color: variables.thirdColor,
                      marginRight: "0.5rem",
                    }}
                  />
                );
                break;
              case Categories.TRANSPORT:
                icon = (
                  <Train
                    fontSize="large"
                    sx={{
                      color: variables.thirdColor,
                      marginRight: "0.5rem",
                    }}
                  />
                );
                break;
              case Categories.HOUSING:
                icon = (
                  <House
                    fontSize="large"
                    sx={{
                      color: variables.thirdColor,
                      marginRight: "0.5rem",
                    }}
                  />
                );
                break;
              case Categories.ENERGY:
                icon = (
                  <Bolt
                    fontSize="large"
                    sx={{
                      color: variables.thirdColor,
                      marginRight: "0.5rem",
                    }}
                  />
                );
                break;
              default:
                icon = (
                  <QuestionMark
                    fontSize="large"
                    sx={{
                      color: variables.thirdColor,
                      marginRight: "0.5rem",
                    }}
                  />
                );
                break;
            }
            return (
              <ExpensesListItem
                key={cat.id}
                IconExpense={icon}
                name={cat.title}
                date={cat.expenseDate ? formattedDate(cat.expenseDate) : ""}
                expenseNumber={cat.emissionTotal}
              />
            );
          })}
        </CarbonCard.Content>
      </CarbonCard>
    </Link>
  );
}
