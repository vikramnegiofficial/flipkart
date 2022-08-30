import { Box, Typography, styled } from "@mui/material";
import { navData } from "../../data/NavbarData";

const StyledBox = styled(Box)`
  max-width: 1280px;

  display: flex;
  margin: auto;
  justify-content: space-between;
`;

const Container = styled(Box)`
  padding: 12px 8px;
  text-align: center;
`;
const NavBarImgTxt = styled(Typography)`
  font-family: inherit;
  color: #172337;
  font-weight: 600;
  font-size: 14px;
`;

const NavMainCont = styled(Box)`
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 16%);
  margin-bottom: 2px;
  background: #fff;
`;

const Navbar = () => {
  return (
    // <Box>
    <NavMainCont>
      <StyledBox>
        {navData.map((data) => {
          return (
            <Container>
              <img src={data.url} alt="Navbar Item" style={{ width: 64 }} />
              <NavBarImgTxt>{data.text}</NavBarImgTxt>
            </Container>
          );
        })}
      </StyledBox>
    </NavMainCont>
    // </Box>
  );
};

export default Navbar;
