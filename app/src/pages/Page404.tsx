import { useRouteError } from "react-router-dom";

export function Page404() {
  const error = useRouteError();
  if (error) console.error(error);

  return <h1>Page404</h1>;
}
