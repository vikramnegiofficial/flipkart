import { Box, styled, Typography } from "@mui/material";
import CustomButton from "./CustomButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import DataProvider from "../../context/dataProvider";
import { useContext } from "react";
import { DataContext } from "../../context/dataProvider";

const StyledBox = styled(Box)`
  margin: 0 20px;
  display: flex;
  align-items: center;
`;
const StyledBoxCont = styled(Box)`
  display: flex;
  align-items: center;
`;
const StyledTypography = styled(Typography)`
  font-size: 15px;
  font-weight: 500;
  font-family: "Roboto Condensed", sans-serif;
  letter-spacing: 1.4;
  font-size-adjust: 0.85;
  font-stretch: expanded;
  transform: scaleX(1.125);
`;

const RigthSidedDiv = () => {
  const { userAcc } = useContext(DataContext);

  return (
    <StyledBoxCont>
      {userAcc ? (
        <Typography style={{ margin: 20, fontSize: 15, fontWeight: 600 }}>
          Hii {userAcc.data.username}!
        </Typography>
      ) : (
        <CustomButton title="Login" />
      )}
      <StyledBox>
        <StyledTypography>Become a Seller</StyledTypography>
      </StyledBox>
      <StyledBox>
        <StyledTypography>More</StyledTypography>

        <KeyboardArrowDownIcon style={{ fontSize: 15 }} />
      </StyledBox>
      <StyledBox>
        <ShoppingCartIcon style={{ fontSize: 20 }} />

        <StyledTypography>&nbsp;Cart</StyledTypography>
      </StyledBox>
    </StyledBoxCont>
  );
};
export default RigthSidedDiv;
