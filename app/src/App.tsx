import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandPageLayout } from "./layouts/LandPageLayout";

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LandPageLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
