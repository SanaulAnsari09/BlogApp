import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/index";

const App = () => {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
};

export default App;
