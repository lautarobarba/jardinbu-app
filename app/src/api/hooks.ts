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
	createSpecies,
	getSpecimens,
	createSpecimen,
	updateUser
} from "./services";


// Mutations hooks ------------------------------------------------------------
// ## Users
export const useRegister = () => {
	return useMutation(registerUser);
}

export const useLogin = () => {
	return useMutation(login);
}

export const useUpdateUser = () => {
	return useMutation(updateUser);
}

export const useLogout = () => {
	return useMutation(logout);
}

export const useSendEmailConfirmationEmail = () => {
	return useMutation(sendEmailConfirmationEmail);
}

export const useConfirmEmail = () => {
	return useMutation(confirmEmail);
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

// ## Species
export const useCreateSpecimen = () => {
	return useMutation(createSpecimen);
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

// ## Specimens
export const useGetSpecimens = (config?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'queryKey' | 'queryFn'>) => {
	return useQuery(['specimens'], getSpecimens, config);
}
