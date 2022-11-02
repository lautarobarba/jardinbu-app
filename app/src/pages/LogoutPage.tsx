import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLogout } from "../api/hooks";
import { PageSubTitle } from "../components/PageSubTitle";
import { PageTitle } from "../components/PageTitle";


export const LogoutPage = () => {

  // const { 
  //   mutate: logoutMutate,
  //   isLoading: logoutIsLoading,
  //   isSuccess: logoutIsSuccess,
  //   // isError: logoutIsError,
  //   // error: logoutError
  // } = useLogout();

  // Sacar token de la store 
  // const [ userToken, setUserToken ] = useStore(??);

  useEffect(() => {
    // console.log(loginUserDto);
    // logoutMutate(token, {
    //   onError: (error) => {
        // Esto solo lo uso para imprimir los errores en consola.
      //   if(Axios.isAxiosError(error)){
      //     console.log({
      //       error: error.response?.status,
      //       mensaje: error.response?.data.message
      //     });
      //   }
      // },
      // onSettled: () => {
      //   USO ESTE onSettled PORQUE QUIERO QUE SE DESLOGUEE AUNQUE HAYA RECIBIDO UN ERROR. NO ME IMPORTA
      //   1° Limpiar la store de redux
      //   2° El usuario se encuentra deslogueado
      //   3° Redireccionar al login
      //   console.log(Redirect to login);
      // }
    // });
  }, []);

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
