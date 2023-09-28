/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Stack,
  TextField,
  Typography,
  FormControl,
  Autocomplete,
  Alert,
} from "@mui/material";
import {
  Bolt,
  House,
  QuestionAnswer,
  Restaurant,
  Train,
} from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import variables from "../../variables";
import CarbonButton from "../CarbonButton";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CategoryItemType, CategoryType } from "../../types/category";
import {
  GET_ALL_CATEGORIES,
  GET_CATEGORY_AND_ITEM,
} from "../../gql/CategoryGql";
import { CREATE_EXPENSE } from "../../gql/ExpenseGql";

interface ExpenseFormProps {
  onSubmitSuccess: () => void;
}

export default function ExpenseForm({ onSubmitSuccess }: ExpenseFormProps) {
  const [openInputLabel, setOpenInputLabel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Fetch
  const [fetchCategories, { data: dataCategory }] = useLazyQuery<{
    getAllCategory: CategoryType[];
  }>(GET_ALL_CATEGORIES);

  const [fetchItems, { data: dataItems }] = useLazyQuery<{
    getCategory: CategoryItemType;
  }>(GET_CATEGORY_AND_ITEM);

  const [createExpense] = useMutation(CREATE_EXPENSE, {
    onCompleted: () => {
      setShowSuccessAlert(true);
      onSubmitSuccess();
    },
    onError: () => {
      onSubmitSuccess();
      setShowSuccessAlert(false);
    },
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // handle
  const handleSelectCategory = async (categoryId: string) => {
    try {
      setSelectedCategory(categoryId);
      fetchItems({
        variables: { categoryId },
      });
    } catch (error) {
      console.error("Problème:", error);
    }
  };

  const inputStyle = {
    fontFamily: "Roboto",
    fontSize: "1rem",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Tu nous as pas dit ce que tu as fait."),
    date: Yup.string().required("Tu nous as pas dit quand c'était."),
    quantity: Yup.number().required("Tu as oublié le principal."),
    itemId: Yup.string().required("Tu as oublié l'item."),
  });
  return (
    <Box sx={{ position: "relative" }}>
      {!validationSchema ? (
        <Alert
          severity="error"
          onClose={() => setShowSuccessAlert(false)}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 300,

            transform: "translate(-50%, -50%)",
            zIndex: 1,
            border: "2px solid red",
          }}
        >
          <Stack direction={"column"} alignItems={"center"} spacing={1}>
            <Typography sx={{ fontFamily: "Roboto" }}>
              Aïe! Mais Qu'est ce que t'as fait?
            </Typography>
          </Stack>
        </Alert>
      ) : null}

      <TextField
        fullWidth
        sx={{ mt: 3 }}
        InputProps={{ style: inputStyle }}
        select={true}
        variant="outlined"
        label="Quel type d'activité as-tu réalisé ?"
        required
        value={selectedCategory}
        onChange={(e) => {
          handleSelectCategory(e.target.value);
          setOpenInputLabel(true);
        }}
        InputLabelProps={{
          shrink: true,
          style: {
            fontFamily: "Roboto",
            fontSize: "1rem",
            color: variables.thirdColor,
          },
        }}
      >
        {dataCategory?.getAllCategory.map((cat) => {
          let icon;
          switch (cat.name) {
            case "Food":
              icon = (
                <Restaurant
                  fontSize="medium"
                  sx={{
                    color: variables.thirdColor,
                    marginRight: "0.5rem",
                  }}
                />
              );
              break;
            case "Transport":
              icon = (
                <Train
                  fontSize="medium"
                  sx={{
                    color: variables.thirdColor,
                    marginRight: "0.5rem",
                  }}
                />
              );
              break;
            case "Housing":
              icon = (
                <House
                  fontSize="medium"
                  sx={{
                    color: variables.thirdColor,
                    marginRight: "0.5rem",
                  }}
                />
              );
              break;
            case "Energy":
              icon = (
                <Bolt
                  fontSize="medium"
                  sx={{
                    color: variables.thirdColor,
                    marginRight: "0.5rem",
                  }}
                />
              );
              break;
            default:
              icon = (
                <QuestionAnswer
                  fontSize="medium"
                  sx={{
                    color: variables.thirdColor,
                    marginRight: "0.5rem",
                  }}
                />
              );
              break;
          }
          return (
            <MenuItem key={cat.id} value={cat.id}>
              <Stack direction="row">
                {icon}
                <Typography sx={inputStyle}>{cat.name}</Typography>
              </Stack>
            </MenuItem>
          );
        })}
      </TextField>

      {/* //////////////////////// FORM ///////////////////////////////////          */}

      <Formik
        initialValues={{
          title: "",
          quantity: 0,
          itemId: "",
          date: new Date(),
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          createExpense({
            variables: {
              date: values.date,
              quantity: values.quantity,
              title: values.title,
              itemId: values.itemId,
            },
          });
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({
          errors,
          values,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }): JSX.Element => (
          <Form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {openInputLabel && (
              <>
                <FormControl>
                  <TextField
                    value={values.title}
                    name="title"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange}
                    label="Qu'est ce que tu as fait de beau ?"
                    InputProps={{
                      style: inputStyle,
                    }}
                    InputLabelProps={{
                      shrink: true,
                      style: {
                        fontFamily: "Roboto",
                        fontSize: "1rem",
                        color: variables.thirdColor,
                      },
                    }}
                  />
                </FormControl>

                <FormControl>
                  <Autocomplete
                    id="itemId"
                    disableClearable
                    options={dataItems ? dataItems.getCategory.items : []}
                    getOptionLabel={(option) => option.label}
                    onChange={(e, values) => {
                      setFieldValue("itemId", values.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        value={values.itemId}
                        required
                        {...params}
                        label="Choisis ce qui correspond à ton activité ?"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                          style: inputStyle,
                        }}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            fontFamily: "Roboto",
                            fontSize: "1rem",
                            color: variables.thirdColor,
                          },
                        }}
                      />
                    )}
                  />
                </FormControl>
              </>
            )}

            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Mais non ?! Quand ça ?"
                  value={values.date}
                  onChange={() => handleChange}
                  format="dd/MM/yyyy"
                  sx={{
                    ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                      fontFamily: "Roboto",
                      fontSize: "1rem",
                    },
                    ".css-1pq332w-MuiFormLabel-root-MuiInputLabel-root": {
                      fontFamily: "Roboto",
                      fontSize: "1rem",
                      color: variables.thirdColor,
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl>
              <TextField
                InputProps={{ style: inputStyle }}
                fullWidth
                type="number"
                id="quantity"
                name="quantity"
                label="Combien ?? (en km, g, L)"
                variant="outlined"
                placeholder="55 pour un trajet voiture de 55km"
                required
                value={values.quantity}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                    color: variables.thirdColor,
                  },
                }}
                error={touched.quantity && Boolean(errors.quantity)}
                helperText={touched.quantity && errors.quantity}
              />
            </FormControl>

            <CarbonButton
              type="submit"
              variant="contained"
              style={{ marginTop: "1rem" }}
              sx={{
                backgroundColor: variables.primaryColor,
                fontFamily: "Roboto",
              }}
            >
              Soumettre
            </CarbonButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
