import "./App.css";
import Header from "./components/Header/header";
import { Box } from "@mui/material";
import HomePage from "./components/Home/Home";
import DataProvider from "./context/dataProvider";

function App() {
  return (
    <>
      <DataProvider>
        <Header />
        <Box style={{ marginTop: 56 }}>
          <HomePage />
        </Box>
      </DataProvider>
    </>
  );
}

export default App;
