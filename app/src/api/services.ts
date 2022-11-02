import Axios, { AxiosError, AxiosResponse } from "axios";
import { CreateUserDto } from '../interfaces/CreateUserDto';
import { LoginUserDto } from "../interfaces/LoginUserDto";
import { SessionDto } from "../interfaces/SessionDto";


// Api Url
const apiBaseUrl: string = process.env.REACT_APP_APIURL ?? 'http://localhost:7000';


// Client to fetch
const axiosClient = Axios.create({
  baseURL: `${apiBaseUrl}/api/`,
  timeout: 10 * 1000, // 10 sec
});


// Mutations
const register = async (createUserDto: CreateUserDto, getState: any) => {
  const token: string = await getState().auth.token;

  return axiosClient.post('auth/register',
    createUserDto,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export const login = async (loginUserDto: LoginUserDto) => {
  return await axiosClient.post('auth/login',
    loginUserDto
  );
}



// SIN AXIOS
// TODO: SACAAR ==========================================
const baseURL: string = "http://localhost:7001/api/";

// FindAll
export const getFamilies = async () => {
  const response = await fetch(`${baseURL}family`);
  return response.json();
  // return client.get("families");
};

export const getSpecies = async () => {
  const response = await fetch("http://localhost/api/species");
  return response.json();
  // return client.get("species");
};
