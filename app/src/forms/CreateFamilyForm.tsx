import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { TextField } from '@mui/material';
import { MDBBtn } from 'mdb-react-ui-kit';
import Axios from 'axios';
import { useCreateFamily } from "../api/hooks";
import { CreateFamilyDto } from "../interfaces/CreateFamilyDto";
import { useJwtToken } from "../features/auth/authHooks";
import { useQueryClient } from "@tanstack/react-query";

const ValidationSchema = Yup.object().shape({
	name: Yup.string()
    .min(2, "Demaciado corto")
    .max(100, "Demaciado largo")
    .required("La familia necesita un nombre"),
	description: Yup.string()
		.min(2, "Demaciado corto")
		.max(100, "Demaciado largo")
});

interface Values {
  name: string;
  description: string;
}

interface Props {
	toggleForm: Function
}

export const CreateFamilyForm = (props: Props) => {
	const { toggleForm } = props;

	const queryClient = useQueryClient();

	// Mutación
  const { 
    mutate: createFamilyMutate,
    isLoading: createFamilyIsLoading,
    isSuccess: createFamilyIsSuccess,
    // isError: createFamilyIsError,
    // error: createFamilyError
  } = useCreateFamily();

	const jwtToken = useJwtToken();

	const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (
      values: Values,
      { setErrors }: FormikHelpers<Values>
    ) => {
      const createFamilyDto: CreateFamilyDto = {
        name: values.name,
        description: values.description,
      };
      
      createFamilyMutate({ createFamilyDto, token: jwtToken ?? ''}, {
        onError: (error) => {
          if(Axios.isAxiosError(error)){
            const errorCode = error.response?.status;
            console.log({ errorCode });
						if (Number(errorCode) === 409){
              console.log({
                error: errorCode,
                mensaje: error.response?.data.message
              });
              setErrors({
                name: 'Este nombre ya se encuentra registrado'
              })
            } else {
              console.log({
                error: errorCode,
                mensaje: error.response?.data.message
              });
            }
          }
        },
        onSuccess: () => {
          console.log('Nueva familia creada');
					queryClient.invalidateQueries(['families']);
					toggleForm();
        }
      });
    },
  });

	return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="name"
        name="name"
        label="Nombre"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        fullWidth
        margin="normal"
        required
        autoComplete="name"
        autoFocus
      />
      <TextField
        id="description"
        name="description"
        label="Descripción"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        fullWidth
        margin="normal"
        autoComplete="description"
        autoFocus
      />
			<div className="text-center">
      <MDBBtn
        color="primary"
				size='lg'
        type="submit"
				className='bg-primary w-10'
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        disabled={ createFamilyIsLoading }
      >
        { createFamilyIsLoading ? (
          'Guardando...'
        ) : (
          'Guardar'
        )}
      </MDBBtn>
			</div>
    </form>
  );
}
