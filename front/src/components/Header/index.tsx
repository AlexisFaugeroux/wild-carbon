import { Box, FormControl, Popover } from "@mui/material";
import { Menu, Person } from "@mui/icons-material";
import { useState } from "react";
import { useFormik } from "formik";
import CarbonIconButton from "../CarbonIconButton";
import variables from "../../variables";
import CarbonButton from "../CarbonButton";
import CarbonInputBase from "../CarbonInputBase";
// import MenuBar from "../Menu";
import logo from "../../assets/FinalLogo.png";

const HeaderBar = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpeningPopover = () => {
    setIsOpenPopover(!isOpenPopover);
  };
  const handleClosingPopover = () => {
    setIsOpenPopover(!isOpenPopover);
  };

  const handleOpeningMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const formik = useFormik({
    initialValues: {
      pseudo: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: variables.bgHeaderFooter,
          position: "relative",
          height: variables.heightHeader,
          display: "flex",
          alignItems: "center",
        }}
      >
        <CarbonIconButton
          sx={{ position: "absolute" }}
          icon={<Menu color="primary" fontSize="large" />}
          onClick={handleOpeningMenu}
        />
        {/* <MenuBar isOpenMenu /> */}
        <Box
          sx={{
            margin: "auto",
            height: `calc(${variables.heightHeader} - 1vh)`,
          }}
        >
          <img src={logo} alt="Logo BalanceTonCarbone" height="100%" />
        </Box>
        <CarbonIconButton
          sx={{ position: "absolute", right: "0" }}
          icon={<Person color="primary" fontSize="large" />}
          onClick={handleOpeningPopover}
        />
      </Box>

      <Popover
        open={isOpenPopover}
        onClose={handleClosingPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          boxShadow:
            "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        }}
      >
        <Box
          sx={{ backgroundColor: variables.bgHeaderFooter, padding: "20px" }}
        >
          <FormControl
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <CarbonInputBase
              placeholder="Pseudo"
              id="pseudo"
              name="pseudo"
              onChange={formik.handleChange}
              value={formik.values.pseudo}
            />
            <CarbonInputBase
              placeholder="Mot de passe"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <CarbonButton>Se connecter</CarbonButton>
          </FormControl>
        </Box>
      </Popover>
    </Box>
  );
};

export default HeaderBar;
