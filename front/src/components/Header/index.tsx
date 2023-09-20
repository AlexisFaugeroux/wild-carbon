import { Box, Popover } from '@mui/material';
import { Menu, Person } from '@mui/icons-material';
import { useState } from 'react';
import CarbonIconButton from '../CarbonIconButton';
import AuthenticationForm from '../AuthenticationForm';
import MenuBar from '../Menu';
import logo from '../../assets/FinalLogo.png';
import variables from '../../variables';

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
    setIsOpenMenu(true);
  };

  const handleClosingMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: variables.bgHeaderFooter,
          position: 'relative',
          height: variables.heightHeader,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CarbonIconButton
          sx={{
            backgroundColor: variables.bgHeaderFooter,
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 2,
          }}
          icon={<Menu color="primary" fontSize="large" />}
          onClick={handleOpeningMenu}
        />
        <MenuBar onClose={handleClosingMenu} isOpenMenu={isOpenMenu} />
        <Box
          sx={{
            margin: 'auto',
            height: `calc(${variables.heightHeader} - 1vh)`,
          }}
        >
          <img src={logo} alt="Logo BalanceTonCarbone" height="100%" />
        </Box>
        <CarbonIconButton
          sx={{ position: 'absolute', right: '0' }}
          icon={<Person color="primary" fontSize="large" />}
          onClick={handleOpeningPopover}
        />
      </Box>

      <Popover
        open={isOpenPopover}
        onClose={handleClosingPopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          boxShadow:
            'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        }}
      >
        <Box
          sx={{ backgroundColor: variables.bgHeaderFooter, padding: '20px' }}
        >
          <AuthenticationForm handleClosingPopover={handleClosingPopover} />
        </Box>
      </Popover>
    </Box>
  );
};

export default HeaderBar;
