import { PageSubTitle } from "../components/PageSubTitle";
import { PageTitle } from "../components/PageTitle";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useEffect } from "react";

export const HomePage = () => {

  // Recupero la session actual de la storage 
  //  para saber si el usuario esta autenticado
  const user = useAppSelector(selectCurrentUser);
  
  useEffect(() => {
    if(user){
      console.log({ mess: 'USER LOGUEADO' });
      console.log(user);
    } else {
      console.log({ mess: 'USER NO LOGUEADO' });
      console.log(user);
    }
  }, [user]);


  return (
    <>
      <PageTitle title="Biblioteca del Bosque" />
      <PageSubTitle title="INICIO PÚBLICO" className="w-100 text-center" />

      <p>Vistas públicas para visitantes</p>
      <ul>
        <li>
          <Link to={"/app/species"}>Especies</Link>
        </li>
      </ul>
      <hr />
      <PageSubTitle title="Testeando Autenticación.." />
      <ul>
        <li>
          <Link to={"/app/auth/register"}>Registro</Link>
        </li>
        <li>
          <Link to={"/app/auth/login"}>Login</Link>
        </li>
      </ul>
      { user ? (
        <>
          <p>Usuario logueado: {user.firstname} {user.lastname}</p>
          <Link 
            to={"/app/auth/logout"} 
            className="btn bg-dark text-white"
          >
            SALIR
          </Link>
        </>
      ):(
        <p>No hay usuario logueado</p>
      )}
    </>
  );
};
