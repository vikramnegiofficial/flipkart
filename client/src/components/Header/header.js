import { AppBar, Toolbar, styled, Box, Typography } from "@mui/material";
import RigthSidedDiv from "./rigthSideDiv";
import SearchField from "./searchField";

const StyledHeader = styled(AppBar)`
  height: 56px;
  background: #2874f0;
`;

const StyledExplore = styled(Box)`
  line-height: 0;
`;
const StyledlogoSec = styled(Box)`
  margin-left: 12%;
  //   height: 56;
  aline-item: center;
`;
const StyTypogpyExp = styled(Typography)`
  line-height: 0;
  font-size: 12px;
  font-style: italic;
`;

const Header = () => {
  const logoUrl =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const Pluslogo =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";
  return (
    <StyledHeader>
      <Toolbar style={{ minHeight: 56 }}>
        <StyledlogoSec>
          <img src={logoUrl} alt="flipKart logo" style={{ width: 75 }} />
          <StyTypogpyExp>
            Explore{" "}
            <StyledExplore component="span">
              plus <img src={Pluslogo} alt="plus" style={{ width: 10 }} />
            </StyledExplore>
          </StyTypogpyExp>
        </StyledlogoSec>
        <SearchField />
        {/* <CustomButton title="Login" /> */}
        <RigthSidedDiv />
      </Toolbar>
    </StyledHeader>
  );
};
export default Header;
