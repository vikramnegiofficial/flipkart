import { InputBase, Box, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchFieldCont = styled(Box)`
  background: #fff;
  width: 36%;
  border-radius: 2px;
  margin-left: 10px;
  display: flex;
  height: 36px;
  justify-content: space-between;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 23%);
`;
const InputBaseCont = styled(InputBase)`
  width: 100%;
  padding-left: 15px;
  font-size: unset;
`;
const StyledSearchIcon = styled(SearchIcon)`
  color: #2874f0;
  padding: 5px;
`;

const SearchField = () => {
  return (
    <SearchFieldCont>
      <InputBaseCont placeholder="Search fro products, brands and more" />
      <StyledSearchIcon />
    </SearchFieldCont>
  );
};

export default SearchField;
