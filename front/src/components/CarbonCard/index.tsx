import {
  Card,
  CardProps,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import CarbonCardContent from './components/Content';
import CarbonCardActions from './components/Actions';
import CarboneCardMedia from './components/Media';

interface CardParts {
  Media: typeof CarboneCardMedia;
  Content: typeof CarbonCardContent;
  Actions: typeof CarbonCardActions;
}

type CarbonCardProps = CardProps & {
  children: React.ReactNode;
  title?: string;
};

const CarbonCard: FC<CarbonCardProps> & CardParts = ({
  children,
  title,
  ...CardProps
}) => {
  return (
    <Card 
      {...CardProps}
      sx={{
        marginBottom: "12px",
        padding: "12px"
      }}
    >
      {title ? (
        <Typography variant="body1" component="div" sx={{ marginBottom: "16px" }}>
          {title}
        </Typography>
      ) : null}

      {children}
    </Card>
  );
};

CarbonCard.Media = CarboneCardMedia;
CarbonCard.Content = CarbonCardContent;
CarbonCard.Actions = CarbonCardActions;

export default CarbonCard;
