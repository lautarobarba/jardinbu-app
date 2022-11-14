import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
	registerUser,
	login,
	logout,
	getAuthUser
} from "./services";


// Mutations hooks
export const useRegister = (config?: any) => {
	return useMutation(registerUser, config);
}

export const useLogin = (config?: any) => {
	return useMutation(login, config);
}

export const useLogout = (config?: any) => {
	return useMutation(logout, config);
}


// Queries hooks
export const useGetAuthUser = (token: string, config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>) => {
	return useQuery(['auth-user'], () => getAuthUser(token), config);
}

// use query de facu
// export const useGetProyectos = (
//   config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>
// ) => useQuery(['proyectos'], () => getProyectos(), config);