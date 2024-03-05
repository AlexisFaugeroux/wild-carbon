/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  CardContent,
  Theme,
  Typography,
  useMediaQuery,
  Stack,
} from "@mui/material";
import ExpensesCard from "../../components/ExpensesCard";

import GraphicTracking from "../../components/GraphicTracking";
import AddExpenseModal from "../../components/AddExpenseModal/AddExpenseModal";
import GoodDeals from "../../components/GoodDeals";
import FriendsCard from "../../components/Friends";
import AddFriendsCard from "../../components/AddFriendsCard";
import { FriendsContextProvider } from "../../hooks/useFriendsContext";
import { Masonry } from "@mui/lab";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../hooks/useLoginContext";
import { useQuery } from "@apollo/client";
import { User } from "../../types/user";
import { GET_USER } from "../../gql/UserGql";
import { ExpenseType } from "../../types/expense";
import { GET_EXPENSE_BY_USER_ID } from "../../gql/ExpenseGql";

export default function Dashboard() {
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const { userId } = useContext(LoginContext);
  const [totalEmission, setTotalEmission] = useState(0);

  // INFO USER
  const { data: dataUser } = useQuery<{
    userData: User;
  }>(GET_USER, {
    variables: {
      id: userId,
    },
  });

  // DATA EXPENSES
  const { data: dataExpenses, refetch } = useQuery<{
    getAllExpensesByUserId: ExpenseType[];
  }>(GET_EXPENSE_BY_USER_ID, {
    variables: {
      userId: userId,
    },
  });

  const handleEmissionTotal = () => {
    let totalEmission = 0;
    dataExpenses?.getAllExpensesByUserId.map((el) => {
      totalEmission = totalEmission + (el.emissionTotal || 0);
    });
    return totalEmission;
  };

  useEffect(() => {
    if (dataExpenses) refetch();
    const totalEmissionValue = handleEmissionTotal();
    setTotalEmission(totalEmissionValue);
  }, [dataExpenses]);

  return (
    <Box sx={{ height: "85vh", overflow: "scroll", padding: "12px" }}>
      <Stack
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        sx={{
          gap: { xs: 0, lg: 2 },
          "& > *": {
            flexBasis: { xs: "calc(100% - 20px)", lg: "calc(50% - 20px)" },
          },
        }}
      >
        <Stack direction={"row"} gap={{ lg: 2 }}>
          <Box
            sx={{
              width: "120%",
              backgroundColor: { xs: "transparent", lg: "#1CAF68" },
              transition: { lg: "background-color 0.3s" },
              "&:hover": {
                backgroundColor: "#3C8962",
              },
              marginBottom: { xs: 0, lg: 2 },
            }}
          >
            <CardContent sx={{ padding: { xs: 0, lg: 2 } }}>
              <Stack direction={"column"}>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: { xs: "1.2rem", lg: "1.8rem" },
                    fontWeight: 600,
                    marginBottom: { xs: "5px", lg: "20px" },
                    color: { xs: "#3C8962", lg: "#FFFFFF" },
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Bienvenue sur ton espace
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "1.3rem", lg: "2rem" },
                    fontWeight: 600,
                    marginBottom: { xs: "5px", lg: "20px" },
                    color: { xs: "#3C8962", lg: "#FFFFFF" },
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    textAlign: "center",
                  }}
                >
                  {dataUser?.userData.pseudo}
                </Typography>
              </Stack>
            </CardContent>
          </Box>
          <Box
            sx={{
              border: { lg: "2px solid #3C8962" },
              backgroundColor: "transparent",
              padding: { lg: 2, xs: 0 },
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
              },
              marginBottom: { xs: 0, lg: 2 },
            }}
          >
            <CardContent
              sx={{
                padding: { xs: "0 !important" },
                display: "block",
                margin: "auto",
              }}
            >
              <AddExpenseModal />
            </CardContent>
          </Box>
        </Stack>
        <Box
          sx={{
            width: "100%",
            backgroundColor: { xs: "transparent", lg: "#A98E60" },
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#876E45",
            },
            margin: { xs: 0 },
            marginBottom: { xs: 0, lg: 2 },
            padding: { xs: 0, lg: 2 },
          }}
        >
          <CardContent
            sx={{
              padding: { xs: "0 !important" },
            }}
          >
            <Stack direction={"column"}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1.2rem", lg: "1.8rem" },
                  fontFamily: "Roboto",
                  fontWeight: 600,
                  marginBottom: { xs: "5px", lg: "20px" },
                  color: { xs: "#876E45", lg: "#FFFFFF" },
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Totale émission
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.3rem", lg: "2rem" },

                  fontWeight: 600,
                  marginBottom: { xs: "5px", lg: "20px" },
                  color: { xs: "#876E45", lg: "#FFFFFF" },
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  textAlign: "center",
                }}
              >
                {totalEmission}g de Co2
              </Typography>
            </Stack>
          </CardContent>
        </Box>
      </Stack>

      <Masonry columns={isLg ? 2 : 1} spacing={2}>
        <ExpensesCard expensesList={dataExpenses?.getAllExpensesByUserId} />
        <GraphicTracking />
        <GoodDeals />
        <FriendsContextProvider>
          <FriendsCard />
          <AddFriendsCard />
        </FriendsContextProvider>
      </Masonry>
    </Box>
  );
}
