/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  ButtonGroup,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import variables from "../../variables";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  DELETE_EXPENSE_BY_ID,
  GET_EXPENSE_BY_USER_ID,
} from "../../gql/ExpenseGql";
import { useContext, useEffect, useState } from "react";
import { ExpenseType } from "../../types/expense";
import { Delete } from "@mui/icons-material";
import { format } from "date-fns";
import AddExpenseModal from "../../components/AddExpenseModal/AddExpenseModal";
import CategoryBar from "./utils/CategoryBar";
import EditExpenseModal from "./utils/EditExpenseModal";
import { LoginContext } from "../../hooks/useLoginContext";

export default function ExpensesPage() {
  const { userId } = useContext(LoginContext);
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  // const isPortrait = useMediaQuery("(orientation: portrait)");
  // const isLandscape = useMediaQuery("(orientation: landscape)");

  const inputStyle = {
    fontFamily: "Roboto",
    fontSize: "1rem",
    title: {
      color: variables.thirdColor,
      fontWeight: "bold",
    },
  };

  const [fetchExpensesByUserId, { data: dataExpenses }] = useLazyQuery<{
    getAllExpensesByUserId: ExpenseType[];
  }>(GET_EXPENSE_BY_USER_ID);

  const [formattedExpenses, setFormattedExpenses] = useState<ExpenseType[]>([]);

  const [deleteExpense] = useMutation(DELETE_EXPENSE_BY_ID);

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense({
        variables: { expenseId: id },
        onCompleted: (data) => {
          console.log(data);
        },
        refetchQueries: [GET_EXPENSE_BY_USER_ID],
      });
    } catch {
      throw new Error(
        "Un problème est survenu lors de la supression de la dépense"
      );
    }
  };

  useEffect(() => {
    fetchExpensesByUserId({
      variables: { userId },
    });
  }, [fetchExpensesByUserId]);

  useEffect(() => {
    if (dataExpenses && dataExpenses.getAllExpensesByUserId) {
      const formattedData = dataExpenses.getAllExpensesByUserId.map(
        (expense) => ({
          ...expense,
          createdAt: expense.createdAt
            ? format(new Date(expense.createdAt), "dd/MM/yy")
            : undefined,
        })
      );
      setFormattedExpenses(formattedData);
    }
  }, [dataExpenses]);

  return (
    <Box
      sx={{
        height: `calc(100vh - (${variables.heightHeader} + ${variables.heightFooter}))`,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          marginTop: "0.5rem",
          marginRight: "0.5rem",
          fontFamily: "Roboto",
          textAlign: "center",
          fontSize: {
            xs: "1.2rem",
            sm: "1.3rem",
            md: "1.4rem",
            lg: "1.5rem",
            xl: "1.5rem",
          },
        }}
      >
        Mes dépenses carbones
      </Typography>

      <AddExpenseModal />

      <Box width={isLg ? "60%" : "100%"} margin={isLg ? "auto" : "0"}>
        <CategoryBar />

        <TableContainer component={Paper}>
          <Table
            sx={{
              width: "100%",
              maxHeight: `calc(100vh - (${variables.heightHeader} + ${variables.heightFooter}))`,
              overflow: "scroll",
            }}
            size={isLg ? "medium" : "small"}
            aria-label="Mes dépenses carbone"
            width={isLg ? "100%" : "auto"}
          >
            <TableHead>
              <TableRow sx={{ fontSize: isLg ? "0.9rem" : "1rem" }}>
                <TableCell
                  style={inputStyle.title}
                  sx={{ fontSize: isLg ? "1rem" : "0.8rem" }}
                >
                  Dépense
                </TableCell>
                <TableCell
                  style={inputStyle.title}
                  sx={{ fontSize: isLg ? "1rem" : "0.8rem" }}
                >
                  Quantité
                </TableCell>
                <TableCell
                  style={inputStyle.title}
                  sx={{ fontSize: isLg ? "1rem" : "0.8rem" }}
                >
                  Date
                </TableCell>
                <TableCell
                  style={inputStyle.title}
                  sx={{ fontSize: isLg ? "1rem" : "0.8rem" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formattedExpenses.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={inputStyle} sx={{ width: "75px" }}>
                    {row.title}
                  </TableCell>
                  <TableCell style={inputStyle} sx={{ width: "75px" }}>
                    {row.quantity} {row.item?.unit}
                  </TableCell>
                  <TableCell style={inputStyle} sx={{ width: "75px" }}>
                    {row.createdAt}
                  </TableCell>
                  <TableCell sx={{ width: "50px" }}>
                    <ButtonGroup>
                      <IconButton
                        onClick={() => handleDeleteExpense(row.id)}
                        sx={{ padding: "0" }}
                      >
                        <Delete fontSize="small" sx={{ color: "red" }} />
                      </IconButton>
                      {/* <IconButton sx={{ padding: "0" }}>
                        <Edit fontSize="small" sx={{ color: "orange" }} />
                      </IconButton> */}
                      <EditExpenseModal
                        id={row.id}
                        title={row.title}
                        quantity={row.quantity}
                        date={row.createdAt}
                        item={row.item}
                        itemId={row.itemId}
                      />
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
