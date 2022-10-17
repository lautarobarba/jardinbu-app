import { useRouteError } from "react-router-dom";

export const Page404 = () => {
  const error = useRouteError();
  console.error(error);

  return <h1>Page404</h1>;
};
