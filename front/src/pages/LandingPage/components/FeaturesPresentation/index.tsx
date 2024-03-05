import { FC } from 'react';
import { Box, BoxProps, Stack, Typography, useMediaQuery } from '@mui/material';
import variables from '../../../../variables';

interface FeaturesPresentationProps extends BoxProps {
  title?: string;
  description?: string;
  image?: string;
  isReversed?: boolean;
}

const FeaturesPresentation: FC<FeaturesPresentationProps> = ({
  title,
  description,
  image,
  isReversed,
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const desktopFlexDirection = isReversed ? 'row-reverse' : 'row';
  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : desktopFlexDirection}
      alignItems="center"
      justifyContent="center"
      paddingY={variables.spacings.abs24}
      sx={{
        paddingX: {
          xs: variables.spacings.abs8,
          sm: variables.spacings.abs24,
        },
      }}
      {...props}
    >
      <Stack spacing={3}>
        <Typography fontWeight="bold" variant="h6">
          {title}
        </Typography>

        <Typography>{description}</Typography>
      </Stack>
      <Box
        display="flex"
        justifyContent="center"
        minWidth={!isMobile ? 512 : 0}
      >
        <img
          src={image}
          style={{
            margin: !isMobile ? `0px ${variables.spacings.abs16}` : 0,
            maxHeight: 256,
            maxWidth: 512,
          }}
        />
      </Box>
    </Box>
  );
};

export default FeaturesPresentation;
