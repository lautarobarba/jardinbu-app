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
    </>
  );
};
