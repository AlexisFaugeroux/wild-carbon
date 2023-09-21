import {
  Box,
  Drawer,
  DrawerProps,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { FC } from "react";
import CarbonIconButton from "../CarbonIconButton";
import {
  Diversity1,
  Home,
  ManageAccounts,
  QueryStats,
} from "@mui/icons-material";
import smallLogo from "../../assets/leaf.png";
import logo from "../../assets/FinalLogo.png";

import variables from "../../variables";
import { Link } from "react-router-dom";

type MenuProps = DrawerProps & {
  isOpenMenu: boolean;
  onClose: () => void;
};

const MenuBar: FC<MenuProps> = ({ isOpenMenu, onClose }) => {
  return (
    <Drawer
      open={isOpenMenu}
      onClose={onClose}
      PaperProps={{
        sx: { backgroundColor: variables.backgroundColor },
      }}
    >
      <Box
        sx={{
          margin: "10px auto",
          display: "block",
        }}
      >
        <img src={logo} alt="Logo BalanceTonCarbone" height="30rem" />
      </Box>
      <List
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <ListItem>
              <CarbonIconButton
                icon={<Home fontSize="large" color="secondary" />}
              />
              <Typography
                sx={{
                  color: variables.thirdColor,
                  fontSize: "0.75rem",
                }}
              >
                Dashboard
              </Typography>
            </ListItem>
          </Link>

          <Link to="" style={{ textDecoration: "none" }}>
            <ListItem>
              <CarbonIconButton
                icon={<QueryStats fontSize="large" color="secondary" />}
              />
              <Typography
                sx={{ color: variables.thirdColor, fontSize: "0.75rem" }}
              >
                Mes Stats
              </Typography>
            </ListItem>
          </Link>

          <Link to="" style={{ textDecoration: "none" }}>
            <ListItem>
              <CarbonIconButton
                icon={<Diversity1 fontSize="large" color="secondary" />}
              />
              <Typography
                sx={{ color: variables.thirdColor, fontSize: "0.75rem" }}
              >
                Mes amis émetteur
              </Typography>
            </ListItem>
          </Link>

          <Link to="" style={{ textDecoration: "none" }}>
            <ListItem>
              <CarbonIconButton
                icon={<ManageAccounts fontSize="large" color="secondary" />}
              />
              <Typography
                sx={{ color: variables.thirdColor, fontSize: "0.75rem" }}
              >
                Mon profil
              </Typography>
            </ListItem>
          </Link>
        </Box>

        <Box
          sx={{
            margin: "20px auto",
            display: "block",
          }}
        >
          <img src={smallLogo} alt="Logo BalanceTonCarbone" height="70rem" />
        </Box>
      </List>
    </Drawer>
  );
};

export default MenuBar;
