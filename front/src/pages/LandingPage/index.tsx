import { Box, Grid, Stack } from '@mui/material';
import { FC } from 'react';
import Description from './components/Description';
import FeaturesPresentation from './components/FeaturesPresentation';
import variables from '../../variables';
import { brown, lightGreen } from '@mui/material/colors';
import ListImg from '../../assets/list.png';
import GraphImg from '../../assets/graph.png';
import FriendsImg from '../../assets/friends.png';
import MegaphoneImg from '../../assets/megaphone.png';

const features = [
  {
    title: 'Listez vos dépenses carbone',
    description:
      'Ne perdez plus une trace de vos dépenses carbones avec notre liste intégrée',
    imageUrl: ListImg,
  },
  {
    title: 'Gardez un suivi sur vos dépenses sur le mois',
    description: "En un clin d'oeil, suivez votre progression mensuelle",
    imageUrl: GraphImg,
  },
  {
    title: 'Balancez vos amis',
    description:
      'Un pollueur dans vos amis ? Balancez le sur les réseaux sociaux !',
    imageUrl: FriendsImg,
  },
  {
    title: 'Partagez des bons plans',
    description: 'Montrez à votre entourage à quel point vous êtes cool',
    imageUrl: MegaphoneImg,
  },
];

const LandingPage: FC = () => {
  return (
    <Box height="100%" overflow="auto" position="relative">
      <Stack spacing={0}>
        <Description />
        <Grid container>
          {features.map(({ title, description, imageUrl }, index) => {
            const bgColor = [lightGreen[100], brown[100]];
            return (
              <Grid
                key={title}
                item
                xs={12}
                lg={6}
                sx={{
                  bgcolor: {
                    xs: index % 2 ? bgColor[0] : bgColor[1],
                    lg: index % 3 ? bgColor[0] : bgColor[1],
                  },
                }}
              >
                <FeaturesPresentation
                  title={title}
                  description={description}
                  image={imageUrl}
                  isReversed={index % 2 === 0}
                />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Box>
  );
};

export default LandingPage;
