import { FC } from "react";
import CarbonButton from "../../components/CarbonButton";
import TextField from "../../components/CarbonInput";
import theme from "../../theme";


const HomePage: FC = () => {
    return(
        <>
            <CarbonButton color="primary">Salut</CarbonButton>
            <CarbonButton color="secondary">Au revoir</CarbonButton>
            <TextField/>
            <TextField/>
            <TextField />
            {/* <CarbonIcon><AndroidIcon/></CarbonIcon> */}
        </>
    )
};

export default HomePage;