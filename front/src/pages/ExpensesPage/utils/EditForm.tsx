import {
  Autocomplete,
  Box,
  FormControl,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CategoryType } from "../../../types/category";
import { GET_ALL_CATEGORIES } from "../../../gql/CategoryGql";
import { useLazyQuery, useMutation } from "@apollo/client";
import variables from "../../../variables";
import {
  Bolt,
  House,
  QuestionAnswer,
  Restaurant,
  Train,
} from "@mui/icons-material";
import { ItemType } from "../../../types/item";
import { Form, Formik } from "formik";
import CarbonButton from "../../../components/CarbonButton";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { UPDATE_EXPENSE_BY_ID } from "../../../gql/ExpenseGql";
import { GET_ITEMS_BY_CATEGORY } from "../../../gql/ItemGql";

interface EditFormProps {
  handleClose: () => void;
  id: string;
  title: string;
  quantity: number;
  date?: string;
  item: ItemType;
  itemId: string;
}

export default function EditForm({
  handleClose,
  id,
  title,
  quantity,
  date,
  item,
  itemId,
}: EditFormProps) {
  const [openInputLabel, setOpenInputLabel] = useState(false);
  const [restoredDate, setRestoredDate] = useState<Date | undefined>();

  function restoreDateStringToDate(date: string | undefined): Date | undefined {
    if (date) {
      const [day, month, year] = date.split("/");

      const monthIndex = parseInt(month, 10) - 1;
      const yearIndex = parseInt(year, 10);
      const newYearIndex =
        yearIndex >= 0 && yearIndex <= 99 ? yearIndex + 2000 : yearIndex;
      const dayIndex = parseInt(day, 10);

      if (!isNaN(dayIndex) && !isNaN(monthIndex) && !isNaN(newYearIndex)) {
        const newDate = new Date(newYearIndex, monthIndex, dayIndex);
        return newDate;
      }
    }

    return undefined;
  }

  // Fetch
  const [fetchCategories, { data: dataCategory }] = useLazyQuery<{
    getAllCategory: CategoryType[];
  }>(GET_ALL_CATEGORIES);

  const [fetchItems, { data: dataItems }] = useLazyQuery<{
    getItemByIdCategory: ItemType[];
  }>(GET_ITEMS_BY_CATEGORY);

  // handle
  const handleSelectCategory = async (categoryId: string) => {
    try {
      fetchItems({
        variables: { categoryId },
      });
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  const [updateExpense] = useMutation(UPDATE_EXPENSE_BY_ID, {
    onCompleted: () => {
      console.log("it's working !");
      handleClose();
    },
    onError: () => {
      console.log("it's not working got damit !");
      handleClose();
    },
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    (async () => {
      try {
        await handleSelectCategory(item.category.id);
        const newDate = restoreDateStringToDate(date);
        setRestoredDate(newDate);
        console.log("restoredDate", restoredDate);
      } catch (error) {
        throw new Error(`un problème est survenu lors du montage: ${error}`);
      }
    })();
  }, [item.category.id]);

  const inputStyle = {
    fontFamily: "Roboto",
    fontSize: "1rem",
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        fullWidth
        required
        sx={{ mt: 3 }}
        InputProps={{ style: inputStyle }}
        select
        variant="outlined"
        label="Catégorie d'activité"
        defaultValue={item.category.id}
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

      {/* //////////////////////// FORM /////////////////////////////////// */}

      <Formik
        initialValues={{
          title: title,
          quantity: quantity,
          itemId: item.id,
          date: new Date(),
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          updateExpense({
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
      >
        {({
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }): JSX.Element => (
          <>
            <Form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <>
                <FormControl>
                  <TextField
                    name="title"
                    variant="outlined"
                    fullWidth
                    defaultValue={title}
                    onChange={handleChange}
                    label="Modifie l'intitulé de ta dépense"
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
                    disableClearable
                    options={dataItems ? dataItems.getItemByIdCategory : []}
                    getOptionLabel={(option) => option.label}
                    onChange={(e, values) => {
                      setFieldValue("itemId", values.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        // defaultValue={item.id}
                        // required
                        {...params}
                        label="Choisis ce qui correspond à cette nouvelle dépense"
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
                    renderOption={(props, option) => (
                      <li style={inputStyle} {...props} key={option.id}>
                        {option.label}
                      </li>
                    )}
                  />
                </FormControl>
              </>

              <FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    // label="Modifie la nouvelle date"
                    defaultValue={restoredDate}
                    onChange={() => handleChange}
                    format="dd/MM/yyyy"
                    sx={{
                      ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                        {
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
                  id="quantity"
                  name="quantity"
                  label="Nouvelle quantité"
                  variant="outlined"
                  defaultValue={quantity}
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
          </>
        )}
      </Formik>
    </Box>
  );
}
