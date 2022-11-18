import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { Select, TextField, MenuItem, InputLabel, FormControl } from '@mui/material';
import { MDBBtn } from 'mdb-react-ui-kit';
import Axios from 'axios';
import { useCreateSpecies, useGetFamilies, useGetGenera } from "../api/hooks";
import { useJwtToken } from "../features/auth/authHooks";
import { useQueryClient } from "@tanstack/react-query";
import { CreateGenusDto } from '../interfaces/CreateGenusDto';
import { Family } from '../interfaces/Family';
import { Genus } from '../interfaces/Genus';
import { CreateSpeciesDto } from '../interfaces/CreateSpeciesDto';

const ValidationSchema = Yup.object().shape({
	scientificName: Yup.string()
    .min(2, "Demaciado corto")
    .max(100, "Demaciado largo")
    .required("La especie necesita un nombre"),
  commonName: Yup.string()
		.min(2, "Demaciado corto")
		.max(100, "Demaciado largo"),
	description: Yup.string()
		.min(2, "Demaciado corto")
		.max(100, "Demaciado largo"),
  genusId: Yup.number(),
  status: Yup.string()
		.min(2, "Demaciado corto")
		.max(100, "Demaciado largo")
    .required("La especie necesita un estado"),
  origin: Yup.string()
		.min(2, "Demaciado corto")
		.max(100, "Demaciado largo")
    .required("La especie necesita un origen"),
  foliageType: Yup.string()
		.min(2, "Demaciado corto")
		.max(100, "Demaciado largo"),
});

interface Values {
	scientificName: string,
	commonName: string,
	description: string,
	genusId: number,
	status: string,
	origin: string,
	foliageType: string,
}

interface Props {
	toggleForm: Function
}

export const CreateSpeciesForm = (props: Props) => {
	const { toggleForm } = props;

	const queryClient = useQueryClient();

	// Mutación
  const { 
    mutate: createSpeciesMutate,
    isLoading: createSpeciesIsLoading,
    isSuccess: createSpeciesIsSuccess,
    // isError: createSpeciesIsError,
    // error: createSpeciesError
  } = useCreateSpecies();

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
      scientificName: '',
      commonName: '',
      description: '',
      genusId: 0,
      status: 'PRESENT',
      origin: 'NATIVE',
      foliageType: 'PERENNE',
    },
    validationSchema: ValidationSchema,
    onSubmit: async (
      values: Values,
      { setErrors }: FormikHelpers<Values>
    ) => {
      const createSpeciesDto: CreateSpeciesDto = {
        scientificName: values.scientificName,
        commonName: values.commonName,
        description: values.description,
        genusId: values.genusId,
        status: values.status,
        origin: values.origin,
        foliageType: values.foliageType,
      };
      
      createSpeciesMutate({ createSpeciesDto, token: jwtToken ?? ''}, {
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
                scientificName: 'Este nombre ya se encuentra registrado'
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
          console.log('Nueva especie creada');
					queryClient.invalidateQueries(['species']);
					toggleForm();
        }
      });
    },
  });

	return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="scientificName"
        name="scientificName"
        label="Nombre científico"
        value={formik.values.scientificName}
        onChange={formik.handleChange}
        error={formik.touched.scientificName && Boolean(formik.errors.scientificName)}
        helperText={formik.touched.scientificName && formik.errors.scientificName}
        fullWidth
        margin="normal"
        required
        autoComplete="scientificName"
        autoFocus
      />
      <TextField
        id="commonName"
        name="commonName"
        label="Nombre común"
        value={formik.values.commonName}
        onChange={formik.handleChange}
        error={formik.touched.commonName && Boolean(formik.errors.commonName)}
        helperText={formik.touched.commonName && formik.errors.commonName}
        fullWidth
        margin="normal"
        autoComplete="commonName"
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
        <InputLabel>Género</InputLabel>
        <Select
          id="genusId"
          name="genusId"
          label="Género"
          value={formik.values.genusId}
          onChange={formik.handleChange}
          error={formik.touched.genusId && Boolean(formik.errors.genusId)}
          fullWidth
          autoComplete="genusId"
          autoFocus
        >
          <MenuItem key={0} value={0}>Ninguna</MenuItem>
          {getGeneraIsSuccess && getGeneraData.map((genus: Genus) => {
            return (
              <MenuItem key={genus.id} value={genus.id}>{genus.name} - {genus.family?.name}</MenuItem>
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
      <FormControl fullWidth margin="normal">
        <InputLabel>Estado</InputLabel>
        <Select
          id="status"
          name="status"
          label="Estado"
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.touched.status && Boolean(formik.errors.status)}
          fullWidth
          autoComplete="status"
          autoFocus
        >
          <MenuItem key={0} value={'PRESENT'}>Presente</MenuItem>
          <MenuItem key={1} value={'ABSENT'}>Ausente</MenuItem>
          <MenuItem key={2} value={'EXTINCT'}>Extinta</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Origen</InputLabel>
        <Select
          id="origin"
          name="origin"
          label="Origen"
          value={formik.values.origin}
          onChange={formik.handleChange}
          error={formik.touched.origin && Boolean(formik.errors.origin)}
          fullWidth
          autoComplete="origin"
          autoFocus
        >
          <MenuItem key={0} value={'NATIVE'}>Nativa</MenuItem>
          <MenuItem key={1} value={'INTRODUCED'}>Introducida</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo de follaje</InputLabel>
        <Select
          id="foliageType"
          name="foliageType"
          label="Tipo de follaje"
          value={formik.values.foliageType}
          onChange={formik.handleChange}
          error={formik.touched.foliageType && Boolean(formik.errors.foliageType)}
          fullWidth
          autoComplete="foliageType"
          autoFocus
        >
          <MenuItem key={0} value={'PERENNE'}>Perenne</MenuItem>
        </Select>
      </FormControl>
			<div className="text-center">
        <MDBBtn
          color="primary"
          size='lg'
          type="submit"
          className='bg-primary w-10'
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
          disabled={ createSpeciesIsLoading }
        >
          { createSpeciesIsLoading ? (
            'Guardando...'
          ) : (
            'Guardar'
          )}
        </MDBBtn>
			</div>
    </form>
  );
}
