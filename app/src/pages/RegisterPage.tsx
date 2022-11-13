import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageSubTitle } from "../components/PageSubTitle";
import { PageTitle } from "../components/PageTitle";
import { RegisterForm } from "../forms/RegisterForm";

export const RegisterPage = () => {

  return (
    <>
      {/* Título de la página */}
      <Helmet>
        <title>Crear cuenta</title>
      </Helmet>

      {/* Contenido de la página */}
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div style={{ maxWidth: '85%' }}>
          <Link to={"/app"} className="text-dark">
            <PageTitle title="Biblioteca del bosque" className="mt-5"/>
          </Link>
          <PageSubTitle title="Crear cuenta" className="text-center"/>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
