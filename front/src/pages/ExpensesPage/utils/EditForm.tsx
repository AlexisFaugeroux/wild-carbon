import {
  Autocomplete,
  Box,
  FormControl,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
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
import * as Yup from "yup";
import CarbonButton from "../../../components/CarbonButton";
import { UPDATE_EXPENSE_BY_ID } from "../../../gql/ExpenseGql";
import { GET_ITEMS_BY_CATEGORY } from "../../../gql/ItemGql";
import { Categories } from "../../../types/categoriesEnum";
import { LoginContext } from "../../../hooks/useLoginContext";

interface EditFormProps {
  handleClose: () => void;
  id: string;
  title: string;
  quantity: number;
  item: ItemType;
  itemId: string;
}

export default function EditForm({
  handleClose,
  title,
  quantity,
  item,
  id,
}: EditFormProps) {
  const [, setOpenInputLabel] = useState(false);
  const { userId } = useContext(LoginContext);

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
      handleClose();
    },
    onError: () => {
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
      } catch (error) {
        throw new Error(`un problème est survenu lors du montage: ${error}`);
      }
    })();
  }, [item.category.id]);

  const inputStyle = {
    fontFamily: "Roboto",
    fontSize: "1rem",
  };

  const validationSchema = Yup.object({
    title: Yup.string().matches(/^[a-zA-Z0-9\s]+$/, "Caractères non autorisés"),
  });

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
            case Categories.FOOD:
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
            case Categories.TRANSPORT:
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
            case Categories.HOUSING:
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
            case Categories.ENERGY:
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
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);
            updateExpense({
              variables: {
                id,
                quantity: values.quantity,
                title: values.title,
                itemId: values.itemId,
                userId,
              },
            });
            setSubmitting(false);
            resetForm();
          } catch (error) {
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
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
                    id="itemId"
                    disableClearable
                    options={dataItems ? dataItems.getItemByIdCategory : []}
                    getOptionLabel={(option) => option.label}
                    onChange={(e, values) => {
                      setFieldValue("itemId", values.id);
                    }}
                    renderInput={(params) => (
                      <TextField
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
                <TextField
                  InputProps={{ style: inputStyle }}
                  fullWidth
                  type="number"
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
