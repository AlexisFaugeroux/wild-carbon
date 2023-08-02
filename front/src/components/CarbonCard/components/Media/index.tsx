import { FC } from 'react';
import { CardMedia, CardMediaProps, Stack, Typography } from '@mui/material';

type CarboneCardMediaProps = CardMediaProps & {
  caption?: string;
};

const CarboneCardMedia: FC<CarboneCardMediaProps> = ({
  caption,
  ...cardProps
}) => {
  return (
    <Stack>
      <CardMedia
        {...cardProps}
        sx={{
          borderRadius: '4px',
          height: '250px',
          width: '100%',
        }}
      />
      {caption ? (
        <Typography
          alignSelf="flex-end"
          fontStyle="italic"
          fontSize={10}
          marginBottom="8px"
          marginTop="4px"
          variant="caption"
        >
          {caption}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default CarboneCardMedia;
