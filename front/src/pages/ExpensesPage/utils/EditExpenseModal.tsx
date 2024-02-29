/* eslint-disable react/no-unescaped-entities */
import { Box, Modal, Stack, Typography, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import variables from "../../../variables";
import { ExpenseType } from "../../../types/expense";
import EditForm from "./EditForm";

export default function EditExpenseModal({
  id,
  title,
  quantity,
  item,
  itemId,
}: ExpenseType) {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <IconButton sx={{ padding: "0" }} onClick={handleOpenModal}>
          <Edit fontSize="small" sx={{ color: "orange" }} />
        </IconButton>
      </Box>

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
              Modifie ta dépense
            </Typography>
          </Stack>

          <EditForm
            id={id}
            title={title}
            quantity={quantity}
            item={item}
            itemId={itemId}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </Stack>
  );
}
