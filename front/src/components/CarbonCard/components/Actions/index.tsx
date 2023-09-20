import { Children, FC } from 'react';
import { Box, CardActions, CardActionsProps } from '@mui/material';

type CarbonCardActionsProps = CardActionsProps & {
  children: React.ReactNode;
};

const CarbonCardActions: FC<CarbonCardActionsProps> = ({
  children,
  ...props
}) => {
  return (
    <CardActions>
      <Box display="flex" justifyContent="flex-end" width="100%" {...props}>
        <Box
          display="grid"
          gap={2}
          gridTemplateColumns={`repeat(${Children.count(children)}, auto)`}
        >
          {children}
        </Box>
      </Box>
    </CardActions>
  );
};

export default CarbonCardActions;
