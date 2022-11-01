import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from 'react-helmet-async';

export const App = () => {
  return (
    <div className="App">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </div>
  );
};
