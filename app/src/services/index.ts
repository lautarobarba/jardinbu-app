import Axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { CreateUserDto } from '../interfaces/CreateUserDto';
// Api Url
const apiBaseUrl: string = process.env.REACT_APP_APIURL ?? 'http://localhost:7000';

// Create a client for QueryClientProvider
export const queryClient = new QueryClient();

// Client for fetch
const axiosClient = Axios.create({
  baseURL: `${apiBaseUrl}/api/`,
  timeout: 10 * 1000, // 10 sec
  withCredentials: true,
  // headers: (headers, { getState }) => {
  //   const token: string = getState().auth.token;
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);
  //   }
  //   return headers
  // }
});


// Mutations
const register = async (createUserDto: CreateUserDto, getState: any) => {
  const token: string = await getState().auth.token;

  return axiosClient.post('auth/register',
    createUserDto,
    { headers: { Authorization: `Bearer ${token}` } }
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
