import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import Description from './components/Description';
import FeaturesPresentation from './components/FeaturesPresentation';
import variables from '../../variables';
import { lightGreen } from '@mui/material/colors';
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

        {features.map(({ title, description, imageUrl }, index) => {
          let bgColor: string = lightGreen[50];
          let isReversed = false;
          if (index % 2 === 0) {
            bgColor = variables.bgHeaderFooter;
            isReversed = true;
          }
          return (
            <FeaturesPresentation
              bgcolor={bgColor}
              key={title}
              title={title}
              description={description}
              image={imageUrl}
              isReversed={isReversed}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default LandingPage;
