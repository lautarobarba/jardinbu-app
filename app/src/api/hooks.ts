import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
	registerUser,
	login,
	logout,
	getAuthUser
} from "./services";


// Mutations hooks
export const useRegisterUser = (config?: any) => {
	return useMutation(registerUser, config);
}

export const useLogin = (config?: any) => {
	// TODO: hay que actualizar la info en el authSlice
	return useMutation(login, config);
}

export const useLogout = (token: string, config?: any) => {
	return useMutation(() => logout(token), config);
}


// Queries hooks
export const useGetAuthUser = (token: string, config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>) => {
	return useQuery(['auth-user'], () => getAuthUser(token), config);
}

// use query de facu
// export const useGetProyectos = (
//   config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>
// ) => useQuery(['proyectos'], () => getProyectos(), config);