import Axios from "axios";
import { CreateFamilyDto } from "../interfaces/CreateFamilyDto";
import { CreateGenusDto } from "../interfaces/CreateGenusDto";
import { CreateSpeciesDto } from "../interfaces/CreateSpeciesDto";
import { CreateSpecimenDto } from "../interfaces/CreateSpecimenDto";
import { CreateUserDto } from '../interfaces/CreateUserDto';
import { Family } from "../interfaces/Family";
import { Genus } from "../interfaces/Genus";
import { LoginUserDto } from "../interfaces/LoginUserDto";
import { SessionDto } from "../interfaces/SessionDto";
import { Species } from "../interfaces/Species";
import { Specimen } from "../interfaces/Specimen";
import { UpdateUserDto } from "../interfaces/UpdateUserDto";
import { User } from "../interfaces/User";


// Api Url
const apiBaseUrl: string = process.env.REACT_APP_APIURL ?? 'http://localhost:7000';

// Client to fetch
const axiosClient = Axios.create({
  baseURL: `${apiBaseUrl}/api/`,
  timeout: 10 * 1000, // 10 sec
});


// # Mutations ----------------------------------------------------------------
// ## Users
export const registerUser = async (params: { createUserDto: CreateUserDto }): Promise<SessionDto> => {
  const { createUserDto } = params;
  return axiosClient.post('auth/register', createUserDto
  ).then(response => response.data);
}

export const login = async (loginUserDto: LoginUserDto): Promise<SessionDto> => {
  return axiosClient.post('auth/login', loginUserDto
  ).then(response => response.data);
}

export const updateUser = async (params: { updateUserDto: UpdateUserDto, token: string }): Promise<User> => {
  const { updateUserDto, token } = params;
  return axiosClient.patch('user', updateUserDto,
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(response => response.data);
}

export const logout = async (token: string): Promise<void> => {
  return axiosClient.post('auth/logout', null,
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(response => response.data);
}

export const sendEmailConfirmationEmail = async (token: string): Promise<void> => {
  return axiosClient.post('auth/email-confirmation/send', null,
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(response => response.data);
}

export const confirmEmail = async (token: string): Promise<void> => {
  return axiosClient.post('auth/email-confirmation/confirm', null,
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(response => response.data);
}

// ## Families
export const createFamily = async (params: { createFamilyDto: CreateFamilyDto, token: string }): Promise<Family> => {
  const { createFamilyDto, token } = params;
  console.log({ createFamilyDto, token });
  return axiosClient.post('family', createFamilyDto,
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(response => response.data);
}

// ## Genera
export const createGenus = async (params: { createGenusDto: CreateGenusDto, token: string }): Promise<Family> => {
  const { createGenusDto, token } = params;
  console.log({ createGenusDto, token });
  return axiosClient.post('genus', createGenusDto,
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(response => response.data);
}

// ## Genera
export const createSpecies = async (params: { createSpeciesDto: CreateSpeciesDto, token: string }): Promise<Family> => {
  const { createSpeciesDto, token } = params;
  console.log({ createSpeciesDto, token });
  return axiosClient.post('species', createSpeciesDto,
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(response => response.data);
}

// ## Genera
export const createSpecimen = async (params: { createSpecimenDto: CreateSpecimenDto, token: string }): Promise<Family> => {
  const { createSpecimenDto, token } = params;
  console.log({ createSpecimenDto, token });
  return axiosClient.post('specimen', createSpecimenDto,
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(response => response.data);
}


// # Queries ------------------------------------------------------------------

// ## Users
export const getAuthUser = async (token: string): Promise<User> => {
  return axiosClient.get('auth/user',
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(response => response.data);
}

// ## Families
export const getFamilies = async (): Promise<Family[]> => {
  return axiosClient.get('family',
  ).then(response => response.data);
}

// ## Genera
export const getGenera = async (): Promise<Genus[]> => {
  return axiosClient.get('genus',
  ).then(response => response.data);
}

// ## Species
export const getSpecies = async (): Promise<Species[]> => {
  return axiosClient.get('species',
  ).then(response => response.data);
}

// ## Specimens
export const getSpecimens = async (): Promise<Specimen[]> => {
  return axiosClient.get('specimen',
  ).then(response => response.data);
}