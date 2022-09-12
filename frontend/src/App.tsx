import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandPageLayout } from "./layouts/LandPageLayout";

export const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LandPageLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
