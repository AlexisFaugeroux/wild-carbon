/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Modal,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  Tooltip,
  IconButton,
  Alert,
} from "@mui/material";
import { InfoRounded } from "@mui/icons-material";

import CarbonIconButton from "../CarbonIconButton";
import { useState } from "react";
import carbonAddIcon from "../../assets/carbon_add.png";
import variables from "../../variables";
import ExpenseForm from "./ExpenseForm";

import successG from "../../assets/gif/groot_gif.gif";

export default function AddExpenseModal() {
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowSuccessAlert = () => {
    setShowSuccessAlert(!showSuccessAlert);
  };

  const handleShowErrorAlert = () => {
    setShowErrorAlert(!showErrorAlert);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #3C8962",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Stack
      sx={{
        margin: "1rem 0.5rem",
        marginTop: "1rem",
      }}
    >
      <CarbonIconButton
        onClick={handleOpenModal}
        sx={{
          padding: "0",

          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.2)",
            backgroundColor: "transparent",
          },
        }}
        icon={
          <img
            src={carbonAddIcon}
            alt="carbonIconAdd"
            height={isLg ? "35" : "50"}
          />
        }
      />

      {showSuccessAlert ? (
        <Alert
          severity="success"
          onClose={() => setShowSuccessAlert(false)}
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            width: "90%",

            transform: "translate(-50%, -50%)",
            zIndex: 1,
            border: "2px solid #3C8962",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <Stack direction={"column"} alignItems={"center"} spacing={1}>
            <Typography sx={{ fontFamily: "Roboto" }}>
              Bravo! Merci pour ton honnêteté!
            </Typography>
            <img src={successG} alt="Success" />
          </Stack>
        </Alert>
      ) : null}

      {showErrorAlert ? (
        <Alert
          severity="error"
          onClose={() => setShowErrorAlert(false)}
          sx={{
            position: "absolute",
            top: "25%",
            left: "50%",
            width: "90%",

            transform: "translate(-50%, -50%)",
            zIndex: 1,
            border: "2px solid red",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <Stack direction={"column"} alignItems={"center"} spacing={1}>
            <Typography sx={{ fontFamily: "Roboto" }}>
              Un problème est survenu lors de l'ajout de ta dépense carbone !
              C'est malin !
            </Typography>
          </Stack>
        </Alert>
      ) : null}

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontFamily: "Roboto",
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.2rem",
                  md: "1.2rem",
                  lg: "1.4rem",
                  xl: "1.5rem",
                },
                fontWeight: "bold",
                fontStyle: "italic",
                color: variables.secondaryColor,
              }}
            >
              Balance ta dépense
            </Typography>

            <Tooltip
              title="Remplis simplement ce formulaire, en choisissant une catégorie, un
            titre, l'associer à un élément puis indiquer une quantité. Ta
            quantité d'émission sera alors calculer après validation que tu
            pourra retrouver sur ton dashboard."
            >
              <IconButton aria-label="Information">
                <InfoRounded
                  sx={{ color: variables.thirdColor }}
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
          </Stack>

          <Typography
            sx={{
              mt: 2,
              fontFamily: "Roboto",
              fontSize: "1rem",
              fontWeight: "lighter",
            }}
          >
            Allez, dis nous tout ! Et pas d'entourloupe, la planète le saura...
          </Typography>

          <ExpenseForm
            showSuccessAlert={showSuccessAlert}
            showErrorAlert={showErrorAlert}
            handleShowSuccessAlert={handleShowSuccessAlert}
            handleShowErrorAlert={handleShowErrorAlert}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </Stack>
  );
}