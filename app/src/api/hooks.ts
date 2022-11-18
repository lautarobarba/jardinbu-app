import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
	registerUser,
	login,
	logout,
	getAuthUser,
	getFamilies,
	sendEmailConfirmationEmail,
	confirmEmail,
	createFamily,
	getGenera,
	createGenus,
	getSpecies,
	createSpecies
} from "./services";


// Mutations hooks ------------------------------------------------------------
// TODO:QUITAR CONFIG DE LAS MUTACIONES
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

// ## Families
export const useCreateFamily = () => {
	return useMutation(createFamily);
}

// ## Genera
export const useCreateGenus = () => {
	return useMutation(createGenus);
}

// ## Species
export const useCreateSpecies = () => {
	return useMutation(createSpecies);
}


// Queries hooks --------------------------------------------------------------
// ## Users
export const useGetAuthUser = (token: string, config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>) => {
	return useQuery(['auth-user'], () => getAuthUser(token), config);
}

// ## Families
export const useGetFamilies = (config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>) => {
	return useQuery(['families'], getFamilies, config);
}

// ## Genera
export const useGetGenera = (config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>) => {
	return useQuery(['genera'], getGenera, config);
}

// ## Species
export const useGetSpecies = (config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>) => {
	return useQuery(['species'], getSpecies, config);
}
