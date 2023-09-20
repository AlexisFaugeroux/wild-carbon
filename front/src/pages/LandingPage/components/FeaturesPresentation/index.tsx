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
      paddingX={variables.spacings.abs8}
      {...props}
    >
      <Stack spacing={3}>
        <Typography fontWeight="bold" variant="h6">
          {title}
        </Typography>

        <Typography>{description}</Typography>
      </Stack>
      <img
        src={image}
        style={{
          margin: !isMobile ? `0px ${variables.spacings.abs16}` : 0,
          maxHeight: 256,
          maxWidth: 512,
        }}
      />
    </Box>
  );
};

export default FeaturesPresentation;
