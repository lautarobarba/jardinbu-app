import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { TextField } from '@mui/material';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link, Navigate, useLocation } from "react-router-dom";
import { LoginUserDto } from '../interfaces/LoginUserDto';
import Axios from 'axios';
import { SessionDto } from '../interfaces/SessionDto';
import { useGetAuthUser, useLogin } from '../api/hooks';
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { selectCurrentSession, setCredentials } from "../features/auth/authSlice";


const ValidationSchema = Yup.object().shape({
  email: Yup.string().email("El email no es válido")
    .required("Por favor, ingrese una cuenta de correo"),
  password: Yup.string()
    .min(2, "Contraseña demaciado corta")
    .max(50, "Contraseña demaciado larga")
    .required("Por favor, ingrese la contraseña"),
});

interface Values {
  email: string;
  password: string;
}

export const LoginForm = () => {

  // Recupero la session actual de la storage 
  //  para saber si el usuario esta autenticado
  const logueado = useAppSelector(selectCurrentSession);
  const location = useLocation();

  // if(logueado){
  //   return (<Navigate to="/app/admin" replace state={{ location }}/>); 
  // }

  // const redirectToDashboard = () => {
    // return (<Navigate to="/app/admin" replace state={{ location }}/>); 
  // }

  useEffect(() => {
    if(logueado){
      console.log({ mess: 'USER LOGUEADO' });
      console.log(logueado);

    } else {
      console.log({ mess: 'USER NO LOGUEADO' });
      console.log(logueado);
    }
  }, [logueado]);

  const { 
    mutate: loginMutate,
    isLoading: loginIsLoading,
    isSuccess: loginIsSuccess,
    // isError: loginIsError,
    // error: loginError
  } = useLogin();

  // const [ userToken, setUserToken ] = useState<string>('');
  const [ session, setSession ] = useState<SessionDto>({accessToken: '', refreshToken: ''});

  const {
    // isLoading: getAuthUserIsLoading,
    data: getAuthUserData,
    isSuccess: getAuthUserIsSuccess,
    // isError: getAuthUserIsError,
    // error: getAuthUserError 
  // } = useGetAuthUser(session?.accessToken ,{
  } = useGetAuthUser(session.accessToken, {
    enabled: loginIsSuccess,
    onSuccess: () => {

    }
  });

  const dispatch = useAppDispatch();

	const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (
      values: Values,
      { setErrors }: FormikHelpers<Values>
    ) => {
      const loginUserDto: LoginUserDto = {
        email: values.email,
        password: values.password
      };
      
			// console.log(loginUserDto);
      loginMutate(loginUserDto, {
        onError: (error) => {
          if(Axios.isAxiosError(error)){
            const errorCode = error.response?.status;
            console.log({ errorCode });
            if(Number(errorCode) === 404){
              console.log({
                error: errorCode,
                mensaje: error.response?.data.message
              });
              setErrors({
                email: 'La cuenta no existe'
              })
            } else if (Number(errorCode) === 401){
              console.log({
                error: errorCode,
                mensaje: error.response?.data.message
              });
              setErrors({
                password: 'Contraseña incorrecta'
              })
            } else {
              console.log({
                error: errorCode,
                mensaje: error.response?.data.message
              });
            }
          }
        },
        onSuccess: (session: SessionDto) => {
          console.log(session);
          setSession(session);
        }
      });
    },
  });

  useEffect(() => {
    if (loginIsSuccess && getAuthUserIsSuccess) {
      console.log('Actualizar REDUX userSlice')
      console.log({
        status: 'SUCCESS',
        user: getAuthUserData,
        session: session
      });
  
      dispatch(setCredentials({
        user: getAuthUserData,
        session: session
      }));
    }
  }, [
    loginIsSuccess, 
    getAuthUserIsSuccess, 
    getAuthUserData, 
    dispatch, 
    session
  ]);

  
  // Si el usuario esta logueado lo redirecciono al dashboard
  if(logueado){
    return (<Navigate to="/app/admin" replace state={{ location }}/>); 
  }

	return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
        margin="normal"
        required
        autoComplete="email"
        autoFocus
      />
      <TextField
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        fullWidth
        margin="normal"
        required
        autoComplete="off"
      />
      <MDBBtn
        color="primary"
				size='lg'
        type="submit"
				className='bg-dark w-100'
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        disabled={ loginIsLoading }
      >
        { loginIsLoading ? (
          'Iniciando sesión...'
        ) : (
          'Iniciar sesión'
        )}
      </MDBBtn>
      
			<div className="">
        <div>
				<Link 
          // to={"/app/auth/recover-password"} 
          to={"#"} 
          className="text-dark"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        </div>
        <div>

        <Link 
          to={"/app/auth/register"} 
          className="text-dark"
        >
          ¿Todavía no tenés cuenta? Registrate
        </Link>
        </div>
			</div>
    </form>
  );
}
