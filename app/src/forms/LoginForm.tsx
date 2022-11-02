import * as React from 'react';
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { TextField } from '@mui/material';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import { LoginUserDto } from '../interfaces/LoginUserDto';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/services';
import { AxiosError, AxiosResponse } from 'axios';
import { SessionDto } from '../interfaces/SessionDto';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("El email no es válido.")
    .required("Por favor, ingrese una cuenta de correo"),
  password: Yup.string()
    .min(2, "Contraseña demaciado corta.")
    .max(50, "Contraseña demaciado larga.")
    .required("Por favor, ingrese la contraseña"),
});

interface Values {
  email: string;
  password: string;
}

export const LoginForm = () => {

  const { isLoading, mutate, data, isSuccess, isError, error } = useMutation(login);

	const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (
      values: Values,
      { setErrors }: FormikHelpers<Values>
    ) => {
      const loginUserDto: LoginUserDto = {
        email: values.email,
        password: values.password
      };
      
			console.log(loginUserDto);
      mutate(loginUserDto);
      // mutate(loginUserDto, {
      //   onError: (error) => {
      //     console.log(error);
      //     // if(typeof error === 'AxiosError'){}
      //     // console.log(error.response.data);
      //     // console.log(error.response.data);

      //     // console.log(error?.response?.status);
      //     // if(error?.response?.status == '404'){
      //     //   console.log('NoexisteLaCUENTA');
      //     // } else if (error?.response?.status == '401'){
      //     //   console.log('ContraseñaIncorrecta');
      //     // }
      //   },
      //   onSuccess: (response) => {
      //     if(response instanceof SessionDto)
      //     console.log(response.data);
      //     // const accessToken: string = response.data.accessToken;
      //     // const refreshToken: string = response.data.refreshToken;
      //     // console.log({accessToken});
      //   }
      // });
        // const response: ISession | IError = await register(values);
        // if (isISession(response)) {
        //     // Si se registro y se logueo correctamente entonces
        //     window.location.href = "/";
        // } else if (isIError(response)) {
        //     if(('message' in response) && (response.message === 'Email already in use')){
        //         setErrors({ email: 'El email ya está en uso.' });
        //     }
        // }
    },
  });

  if (isSuccess){
    console.log({
      status: 'SUCCESS',
      response: data
    });
  }

  if (isError){
    console.log({
      status: 'ERROR',
      response: error
    });
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
        disabled={ isLoading ? true : false }
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        { isLoading ? (
          'Iniciando sesión...'
        ) : (
          'Iniciar sesión'
        )}
      </MDBBtn>
      
			<div className="">
        <div>
				<Link 
          to={"/app/auth/recover-password"} 
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
