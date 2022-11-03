import { useRouteError } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { PageSubTitle } from "../components/PageSubTitle";
import { Link } from "react-router-dom";

export const Page404 = () => {
  const error = useRouteError();
  if (error) console.error(error);

  return (
    <>
      <div style={{ minHeight: "100px" }}></div>
      {/* TODO: Reemplazar icono por una imagen del jardin */}
      <FontAwesomeIcon
        icon={faGear}
        className="w-100 text-center"
        style={{ height: "200px" }}
      />
      <PageTitle title="Error 404 (REACTAPP)" />
      <PageSubTitle className="text-center" title="Página no encontrada" />
      <div className="w-100 text-center">
        <p><Link to={"/app/admin"}>Volver al Dashboard</Link></p>
        <p><Link to={"/app"}>Volver al Inicio</Link></p>
      </div>
    </>
  );
}
