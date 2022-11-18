import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { Select, TextField, MenuItem, InputLabel, FormControl } from '@mui/material';
import { MDBBtn } from 'mdb-react-ui-kit';
import Axios from 'axios';
import { useCreateGenus, useGetFamilies } from "../api/hooks";
import { useJwtToken } from "../features/auth/authHooks";
import { useQueryClient } from "@tanstack/react-query";
import { CreateGenusDto } from '../interfaces/CreateGenusDto';
import { Family } from '../interfaces/Family';

const ValidationSchema = Yup.object().shape({
	name: Yup.string()
    .min(2, "Demaciado corto")
    .max(100, "Demaciado largo")
    .required("El género necesita un nombre"),
	description: Yup.string()
		.min(2, "Demaciado corto")
		.max(100, "Demaciado largo"),
  familyId: Yup.number()
});

interface Values {
  name: string;
  description: string;
  familyId: number;
}

interface Props {
	toggleForm: Function
}

export const CreateGenusForm = (props: Props) => {
	const { toggleForm } = props;

	const queryClient = useQueryClient();

	// Mutación
  const { 
    mutate: createGenusMutate,
    isLoading: createGenusIsLoading,
    isSuccess: createGenusIsSuccess,
    // isError: createGenusIsError,
    // error: createGenusError
  } = useCreateGenus();

  // Lista de familias para Select
  const { 
    isSuccess: getFamiliesIsSuccess, 
    data: getFamiliesData, 
  } = useGetFamilies();

	const jwtToken = useJwtToken();

	const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      familyId: 0,
    },
    validationSchema: ValidationSchema,
    onSubmit: async (
      values: Values,
      { setErrors }: FormikHelpers<Values>
    ) => {
      const createGenusDto: CreateGenusDto = {
        name: values.name,
        description: values.description,
        familyId: values.familyId,
      };
      
      createGenusMutate({ createGenusDto, token: jwtToken ?? ''}, {
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
          console.log('Nuevo género creado');
					queryClient.invalidateQueries(['genera']);
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
      <br />
      <FormControl fullWidth margin="normal">
        <InputLabel>Familia</InputLabel>
        <Select
          id="familyId"
          name="familyId"
          label="Familia"
          value={formik.values.familyId}
          onChange={formik.handleChange}
          error={formik.touched.familyId && Boolean(formik.errors.familyId)}
          fullWidth
          autoComplete="familyId"
          autoFocus
        >
          <MenuItem key={0} value={0}>Ninguna</MenuItem>
          {getFamiliesIsSuccess && getFamiliesData.map((family: Family) => {
            return (
              <MenuItem key={family.id} value={family.id}>{family.name}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
			<div className="text-center">
        <MDBBtn
          color="primary"
          size='lg'
          type="submit"
          className='bg-primary w-10'
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
          disabled={ createGenusIsLoading }
        >
          { createGenusIsLoading ? (
            'Guardando...'
          ) : (
            'Guardar'
          )}
        </MDBBtn>
			</div>
    </form>
  );
}
