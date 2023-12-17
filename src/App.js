import logo from "./logo.svg";
import "./App.css";
import { Box, Typography } from "@mui/material";
import ProductMain from "./Components/Product/ProductMain";
import UseMemoExample from "./Components/UseMemo/UseMemoExample";
import APIExample from "./Components/APIExample/APIExample";
import UseContextExample from "./Components/UseContext/UseContextExample";
import Counter from "./Components/ReduxExample/Counter";

function App() {
  return (
    <Box>
      {/* <ProductMain /> */}
      {/* <UseMemoExample/> */}
      {/* <APIExample/> */}
      {/* <UseContextExample /> */}
      <Counter/>
    </Box>
  );
}

export default App;
