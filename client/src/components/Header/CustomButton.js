import { Button, Box, styled } from "@mui/material";
import LoginDialogBox from "../Login/loginDialogBox";
import { useState } from "react";

const StyledBox = styled(Box)`
  // padding: 5px 14px;
  margin: 0 20px;
`;
const StyledBtn = styled(Button)`
  color: #2874f0;
  background-color: #fff;
  padding: 5px 40px;
  height: 32px;
  box-shadow: none;
  border-radius: 2px;
  border: 1px solid #dbdbdb;
  text-transform: none;
  font-weight: 600;
  &:hover {
    background-color: #fff;
  }
`;

const CustomButton = (props) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <>
      <StyledBox onClick={() => openDialog()}>
        <StyledBtn varient="contained">{props.title}</StyledBtn>
      </StyledBox>
      <LoginDialogBox open={open} setOpen={setOpen} />
    </>
  );
};
export default CustomButton;
