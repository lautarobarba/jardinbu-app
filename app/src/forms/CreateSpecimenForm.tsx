import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { Select, TextField, MenuItem, InputLabel, FormControl } from '@mui/material';
import { MDBBtn } from 'mdb-react-ui-kit';
import Axios from 'axios';
import { useCreateGenus, useCreateSpecimen, useGetFamilies, useGetGenera, useGetSpecies } from "../api/hooks";
import { useJwtToken } from "../features/auth/authHooks";
import { useQueryClient } from "@tanstack/react-query";
import { CreateGenusDto } from '../interfaces/CreateGenusDto';
import { Family } from '../interfaces/Family';
import { CreateSpecimenDto } from '../interfaces/CreateSpecimenDto';
import { Species } from '../interfaces/Species';
import { Genus } from '../interfaces/Genus';

const ValidationSchema = Yup.object().shape({
	name: Yup.string()
    .min(2, "Demaciado corto")
    .max(100, "Demaciado largo")
    .required("El ejemplar necesita un nombre"),
	description: Yup.string()
		.min(2, "Demaciado corto")
		.max(100, "Demaciado largo"),
  speciesId: Yup.number(),
  coordLat: Yup.string()
    .min(2, "Demaciado corto")
    .max(100, "Demaciado largo"),
  coordLon: Yup.string()
    .min(2, "Demaciado corto")
    .max(100, "Demaciado largo"),
});

interface Values {
  name: string;
  description: string;
  speciesId: number;
  coordLat: string;
  coordLon: string;
}

interface Props {
	toggleForm: Function
}

export const CreateSpecimenForm = (props: Props) => {
	const { toggleForm } = props;

	const queryClient = useQueryClient();

	// Mutación
  const { 
    mutate: createSpecimenMutate,
    isLoading: createSpecimenIsLoading,
    isSuccess: createSpecimenIsSuccess,
    // isError: createSpecimenIsError,
    // error: createSpecimenError
  } = useCreateSpecimen();

  // Lista de especies para select
  const { 
    isSuccess: getSpeciesIsSuccess, 
    data: getSpeciesData, 
  } = useGetSpecies();

  // Lista de géneros para select
  const { 
    isSuccess: getGeneraIsSuccess, 
    data: getGeneraData, 
  } = useGetGenera();

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
      speciesId: 0,
      coordLat: "",
      coordLon: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (
      values: Values,
      { setErrors }: FormikHelpers<Values>
    ) => {
      const createSpecimenDto: CreateSpecimenDto = {
        name: values.name,
        description: values.description,
        speciesId: values.speciesId,
        coordLat: values.coordLat,
        coordLon: values.coordLon,
      };
      
      createSpecimenMutate({ createSpecimenDto, token: jwtToken ?? ''}, {
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
          console.log('Nuevo ejemplar creado');
					queryClient.invalidateQueries(['specimens']);
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
        <InputLabel>Especie</InputLabel>
        <Select
          id="speciesId"
          name="speciesId"
          label="Especie"
          value={formik.values.speciesId}
          onChange={formik.handleChange}
          error={formik.touched.speciesId && Boolean(formik.errors.speciesId)}
          fullWidth
          autoComplete="speciesId"
          autoFocus
        >
          <MenuItem key={0} value={0}>Ninguna</MenuItem>
          {getSpeciesIsSuccess && getSpeciesData.map((species: Species) => {
            return (
              <MenuItem key={species.id} value={species.id}>{species.scientificName} - {species.commonName}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Género</InputLabel>
        <Select
          id="genusId"
          name="genusId"
          label="Familia"
          value={0}
          fullWidth
          autoComplete="genusId"
          autoFocus
          disabled
        >
          {/* <MenuItem key={0} value={0}>Ninguna</MenuItem> */}
          {/* TODO: Autocompletar al seleccionar una especie */}
          <MenuItem key={0} value={0}>Autocompletar con especie</MenuItem>
          {getGeneraIsSuccess && getGeneraData.map((genus: Genus) => {
            return (
              <MenuItem key={genus.id} value={genus.id}>{genus.name}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Familia</InputLabel>
        <Select
          id="familyId"
          name="familyId"
          label="Familia"
          value={0}
          fullWidth
          autoComplete="familyId"
          autoFocus
          disabled
        >
          {/* <MenuItem key={0} value={0}>Ninguna</MenuItem> */}
          {/* TODO: Autocompletar al seleccionar un genero */}
          <MenuItem key={0} value={0}>Autocompletar con género</MenuItem>
          {getFamiliesIsSuccess && getFamiliesData.map((family: Family) => {
            return (
              <MenuItem key={family.id} value={family.id}>{family.name}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        id="coordLat"
        name="coordLat"
        label="Coord. Latitud"
        value={formik.values.coordLat}
        onChange={formik.handleChange}
        error={formik.touched.coordLat && Boolean(formik.errors.coordLat)}
        helperText={formik.touched.coordLat && formik.errors.coordLat}
        fullWidth
        margin="normal"
        autoComplete="coordLat"
        autoFocus
      />
      <TextField
        id="coordLon"
        name="coordLon"
        label="Coord. Longitud"
        value={formik.values.coordLon}
        onChange={formik.handleChange}
        error={formik.touched.coordLon && Boolean(formik.errors.coordLon)}
        helperText={formik.touched.coordLon && formik.errors.coordLon}
        fullWidth
        margin="normal"
        autoComplete="coordLon"
        autoFocus
      />
			<div className="text-center">
        <MDBBtn
          color="primary"
          size='lg'
          type="submit"
          className='bg-primary w-10'
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
          disabled={ createSpecimenIsLoading }
        >
          { createSpecimenIsLoading ? (
            'Guardando...'
          ) : (
            'Guardar'
          )}
        </MDBBtn>
			</div>
    </form>
  );
}
