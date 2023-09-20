import { Box } from '@mui/material';
import { FC } from 'react';
import variables from '../../variables';
import { WebsiteCarbonBadge } from 'react-websitecarbon-badge';

const Footer: FC = () => {
  return (
    <Box>
      <Box
        bgcolor={variables.bgHeaderFooter}
        height={variables.heightFooter}
        width="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bottom={0}
        sx={{ position: { xs: 'relative', sm: 'absolute' } }}
      >
        <WebsiteCarbonBadge co2="0.12" percentage="89" />
      </Box>
    </Box>
  );
};

export default Footer;
