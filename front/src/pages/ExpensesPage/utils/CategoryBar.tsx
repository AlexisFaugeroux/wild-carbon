import {
  Bolt,
  House,
  QuestionAnswer,
  Restaurant,
  Train,
} from "@mui/icons-material";
import {
  Fade,
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { CategoryType } from "../../../types/category";
import { GET_ALL_CATEGORIES } from "../../../gql/CategoryGql";

import variables from "../../../variables";
import leafImg from "../../../assets/leaf.png";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import CarbonIconButton from "../../../components/CarbonIconButton";

export default function CategoryBar() {
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const [fetchCategories, { data: dataCategory }] = useLazyQuery<{
    getAllCategory: CategoryType[];
  }>(GET_ALL_CATEGORIES);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <Stack
      spacing={1}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-around"}
      margin={"2rem"}
    >
      <Tooltip
        title="Toutes"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        placement="top"
        disableFocusListener
        disableTouchListener
      >
        <>
          {/* // wrap du children pour corriger l'erreur : Failed prop type: Invalid prop children supplied to ForwardRef(Tooltip) */}
          <CarbonIconButton
            sx={{
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.2)",
                backgroundColor: "transparent",
                color: "transparent",
              },
            }}
            icon={
              <img
                src={leafImg}
                alt="logo Balance ton Carbone"
                height={isLg ? "30px" : "15px"}
              />
            }
          />
        </>
      </Tooltip>
      {dataCategory?.getAllCategory.map((el) => {
        let icon;
        switch (el.name) {
          case "Food":
            icon = (
              <Restaurant
                fontSize={isLg ? "large" : "small"}
                sx={{
                  color: variables.primaryColor,
                  marginRight: "0.5rem",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.2)",
                    backgroundColor: "transparent",
                  },
                }}
              />
            );
            break;
          case "Transport":
            icon = (
              <Train
                fontSize={isLg ? "large" : "small"}
                sx={{
                  color: variables.primaryColor,
                  marginRight: "0.5rem",
                }}
              />
            );
            break;
          case "Housing":
            icon = (
              <House
                fontSize={isLg ? "large" : "small"}
                sx={{
                  color: variables.primaryColor,
                  marginRight: "0.5rem",
                }}
              />
            );
            break;
          case "Energy":
            icon = (
              <Bolt
                fontSize={isLg ? "large" : "small"}
                sx={{
                  color: variables.primaryColor,
                  marginRight: "0.5rem",
                }}
              />
            );
            break;
          default:
            icon = (
              <QuestionAnswer
                fontSize={isLg ? "large" : "small"}
                sx={{
                  color: variables.primaryColor,
                  marginRight: "0.5rem",
                }}
              />
            );
            break;
        }
        return (
          <Tooltip
            key={el.id}
            title={el.name}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="top"
            disableFocusListener
            disableTouchListener
          >
            <IconButton>{icon}</IconButton>
          </Tooltip>
        );
      })}
    </Stack>
  );
}
