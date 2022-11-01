import { PageSubTitle } from "../components/PageSubTitle";
import { PageTitle } from "../components/PageTitle";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <>
      <PageTitle title="Biblioteca del Bosque" />
      <PageSubTitle title="Dashboard" />

      <p>Aca va algo de información...</p>
      <ul>
        <li>
          <Link to={"/app/family"}>Familias</Link>
        </li>
        <li>
          <Link to={"/app/genus"}>Géneros</Link>
        </li>
        <li>
          <Link to={"/app/species"}>Especies</Link>
        </li>
      </ul>
      <hr />
      <PageSubTitle title="Autenticación" />
      <p>Aca va la autenticación...</p>
      <ul>
        <li>
          <Link to={"/app/auth/register"}>Registro</Link>
        </li>
        <li>
          <Link to={"/app/auth/login"}>Login</Link>
        </li>
      </ul>
    </>
  );
};
