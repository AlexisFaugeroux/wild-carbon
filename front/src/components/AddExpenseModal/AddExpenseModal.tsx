/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Modal,
  Stack,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  FormControl,
  Autocomplete,
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
import CarbonIconButton from "../CarbonIconButton";
import { useEffect, useState } from "react";
import carbonAddIcon from "../../assets/carbon_add.png";
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
import { ExpenseType } from "../../types/expense";

export default function AddExpenseModal() {
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  const handleOpenModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open, setOpen] = useState(false);
  const [openInputLabel, setOpenInputLabel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedId, setSelectedId] = useState("");

  // Fetch

  const [fetchCategories, { data: dataCategory }] = useLazyQuery<{
    getAllCategory: CategoryType[];
  }>(GET_ALL_CATEGORIES);

  const [fetchItems, { data: dataItems }] = useLazyQuery<{
    getCategory: CategoryItemType;
  }>(GET_CATEGORY_AND_ITEM);

  const [createExpense] = useMutation(CREATE_EXPENSE, {
    onCompleted: (data) => {
      console.log("Mutation successful. Data:", data);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
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

  const inputStyle = {
    fontFamily: "Roboto",
    fontSize: "1rem",
  };

  // 1 récupérer le context du user logged

  // 2 au choix de la catégorie faire une premiere requete des items lié à cette catégorie id

  // 3 à l'envoi du formulaire, relié le titre à de potentiel label item (prédéfini)

  // 4 faire le calcul de l'emission de facteur

  // Une Expense est composé:
  //   - title
  //   - date
  //   - quantity
  //   - user_id
  //   - item_id

  // Il faut récupérer le user actuel pour obtenir l'user_id
  //
  // Il faut récupèrer l'item (label, facteur d'emission, unité)  correspondant à la catégorie selectionné (transport, repas, energie, housing)

  // si value.category === "transport" => get item

  const validationSchema = Yup.object({
    title: Yup.string().required("Tu nous as pas dit ce que tu as fait."),
    date: Yup.string().required("Tu nous as pas dit quand c'était."),
    quantity: Yup.number().required("Tu as oublié le principal."),
    itemId: Yup.string().required("Tu as oublié l'item."),
  });

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

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
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

          <TextField
            fullWidth
            InputProps={{ style: inputStyle }}
            select={true}
            // name="category"
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
            // error={touched.category && Boolean(errors.category)}
            // helperText={touched.category && errors.category}
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
              console.log("Valeurs soumises :", values);
              setSubmitting(false);
              resetForm();
            }}
            // validationSchema={validationSchema}
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
                  marginTop: "2rem",
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
                        // freeSolo
                        id="itemId"
                        disableClearable
                        options={dataItems ? dataItems.getCategory.items : []}
                        getOptionLabel={(option) => option.label}
                        onChange={(e, values) => {
                          setFieldValue("itemId", values.id);
                          // setSelectedId(e.target.value);
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
                        ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                          {
                            fontFamily: "Roboto",
                            fontSize: "1rem",
                          },
                        ".css-tdugjh-MuiFormLabel-root-MuiInputLabel-root": {
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
                    label="Combien ??"
                    variant="outlined"
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
      </Modal>
    </Stack>
  );
}
