import { Helmet } from "react-helmet-async";
import { PageSubTitle } from "../components/PageSubTitle";
import { PageTitle } from "../components/PageTitle";
// import { LoginForm } from "../forms/LoginForm";

export const LoginPage = () => {

  return (
    <>
      {/* Título de la página */}
      <Helmet>
        <title>Iniciar sesión</title>
      </Helmet>

      {/* Contenido de la página */}
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div style={{ maxWidth: '85%' }}>
          <PageTitle title="Biblioteca del bosque" className="mt-5"/>
          <PageSubTitle title="Iniciar sesión" className="text-center"/>
          {/* <LoginForm /> */}
        </div>
      </div>
    </>
  );
}
