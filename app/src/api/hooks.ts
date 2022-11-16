import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
	registerUser,
	login,
	logout,
	getAuthUser,
	getFamilies,
	sendEmailConfirmationEmail,
	confirmEmail
} from "./services";


// Mutations hooks ------------------------------------------------------------

// ## Users
export const useRegister = (config?: any) => {
	return useMutation(registerUser, config);
}

export const useLogin = (config?: any) => {
	return useMutation(login, config);
}

export const useLogout = (config?: any) => {
	return useMutation(logout, config);
}

export const useSendEmailConfirmationEmail = (config?: any) => {
	return useMutation(sendEmailConfirmationEmail, config);
}

export const useConfirmEmail = (config?: any) => {
	return useMutation(confirmEmail, config);
}


// Queries hooks --------------------------------------------

// ## Users
export const useGetAuthUser = (token: string, config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>) => {
	return useQuery(['auth-user'], () => getAuthUser(token), config);
}

// ## Families
export const useGetFamilies = (config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>) => {
	return useQuery(['families'], getFamilies, config);
}

// use query de facu
// export const useGetProyectos = (
//   config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>
// ) => useQuery(['proyectos'], () => getProyectos(), config);