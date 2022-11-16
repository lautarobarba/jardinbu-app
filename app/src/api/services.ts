import Axios from "axios";
import { CreateUserDto } from '../interfaces/CreateUserDto';
import { LoginUserDto } from "../interfaces/LoginUserDto";
import { SessionDto } from "../interfaces/SessionDto";
import { User } from "../interfaces/User";


// Api Url
const apiBaseUrl: string = process.env.REACT_APP_APIURL ?? 'http://localhost:7000';

// Client to fetch
const axiosClient = Axios.create({
  baseURL: `${apiBaseUrl}/api/`,
  timeout: 10 * 1000, // 10 sec
});


// # Mutations ------------------------------------------------------------

// ## Users
export const registerUser = async (createUserDto: CreateUserDto): Promise<SessionDto> => {
  return axiosClient.post('auth/register', createUserDto
  ).then(response => response.data);
}

export const login = async (loginUserDto: LoginUserDto): Promise<SessionDto> => {
  return axiosClient.post('auth/login', loginUserDto
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


// # Queries --------------------------------------------

// ## Users
export const getAuthUser = async (token: string): Promise<User> => {
  return axiosClient.get('auth/user',
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(response => response.data);
}

// ## Families
export const getFamilies = async (): Promise<User> => {
  return axiosClient.get('family',
  ).then(response => response.data);
}

// ## Genra

// ## Species
