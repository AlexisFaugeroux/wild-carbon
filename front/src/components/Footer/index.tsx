import { Box } from '@mui/material';
import { FC } from 'react';
import variables from '../../variables';
import { WebsiteCarbonBadge } from 'react-websitecarbon-badge';

const Footer: FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: variables.bgHeaderFooter,
        height: variables.heightFooter,
        width: '100vw',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <WebsiteCarbonBadge co2="0.12" percentage="89" />
    </Box>
  );
};

export default Footer;
