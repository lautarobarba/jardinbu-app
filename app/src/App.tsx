import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

export const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};
