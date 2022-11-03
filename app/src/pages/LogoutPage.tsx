import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useLocation } from "react-router";
import { useLogout } from "../api/hooks";
import { PageSubTitle } from "../components/PageSubTitle";
import { PageTitle } from "../components/PageTitle";
import { removeCredentials, selectCurrentSession } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Axios from 'axios';


export const LogoutPage = () => {

  // Recupero la session actual de la storage 
  //  para saber si el usuario esta autenticado
  const logueado = useAppSelector(selectCurrentSession);
  const location = useLocation();

  // const [ logoutComplete, setSession ] = useState<booelean>(false);


  const { 
    mutate: logoutMutate,
    isLoading: logoutIsLoading,
    isSuccess: logoutIsSuccess,
    isError: logoutIsError,
    // error: logoutError
  } = useLogout(logueado?.accessToken ?? '');

  const dispatch = useAppDispatch();

  useEffect(() => {
    logoutMutate(null! ,{
      onError: (error) => {
        // Esto solo lo uso para imprimir los errores en consola.
        if(Axios.isAxiosError(error)){
          console.log({
            error: error.response?.status,
            mensaje: error.response?.data.message
          });
        }
      },
    });
  }, [logoutMutate, dispatch]);

  useEffect(() => {
    if(logoutIsSuccess || logoutIsError){
      dispatch(removeCredentials());
    }
  }, [logoutIsSuccess,  logoutIsError, dispatch]);


  // Si el usuario esta logueado lo redirecciono al dashboard
  if(!logueado){
    return (<Navigate to="/app/admin" replace state={{ location }}/>); 
  }
    
  return (
    <>
      {/* Título de la página */}
      <Helmet>
        <title>Cerrar sesión</title>
      </Helmet>

      {/* Contenido de la página */}
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div style={{ maxWidth: '85%' }}>
          <PageTitle title="Biblioteca del bosque" className="mt-5"/>
          <PageSubTitle title="Cerrando sesión..." className="text-center"/>
        </div>
      </div>
    </>
  );
}
