import { FC } from 'react';
import CarbonCard from '../../components/CarbonCard';
import { Box, Typography } from '@mui/material';
import CarbonButton from '../../components/CarbonButton';
import CarbonIconButton from '../../components/CarbonIconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

// C'est juste une page pour jouer avec les composants
// TODO: A supprimer quand on aura terminé

const CanvasPage: FC = () => {
    return(
        <Box alignItems="center" display="flex" justifyContent="center">
            <Box padding="12px" width="30%">
                <CarbonCard title="Mes dépenses carbone récentes">
                    <CarbonCard.Media
                        caption="C'est un chien"
                        image='https://static.cotemaison.fr/medias_10824/w_2048,h_1146,c_crop,x_0,y_184/w_640,h_360,c_fill,g_north/v1456392403/10-conseils-pour-rendre-votre-chien-heureux_5542245.jpg'
                    />
                    <CarbonCard.Actions>
                        <CarbonButton color="error">Cancel</CarbonButton>
                        <CarbonButton color="primary">Send</CarbonButton>
                    </CarbonCard.Actions>
                </CarbonCard>

                <CarbonCard title="Mes amis pollueurs">
                    <CarbonCard.Media
                        caption="Zéro culpabilité"
                        image="https://cap.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcap.2F2018.2F01.2F30.2Feb49a56a-e336-4d0e-9c81-c2b090bc818a.2Ejpeg/1200x630/background-color/ffffff/quality/70/la-vache-a-32-millions-deuros-de-bill-gates-1268961.jpg"
                    />

                    <CarbonCard.Content>
                        <Typography variant="body2">La vache ça broutte</Typography>
                    </CarbonCard.Content>
                    
                    <CarbonCard.Actions>
                        <CarbonIconButton icon={<ThumbUpIcon />} />
                    </CarbonCard.Actions>
                </CarbonCard>
            </Box>
    </Box>
    )
}

export default CanvasPage;