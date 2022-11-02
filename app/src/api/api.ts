import { useMutation, useQuery } from "@tanstack/react-query";
import {
	registerUser,
	login,
	getAuthUser
} from "./services";


// Mutations hooks
export const useRegisterUser = (config?: any) => {
	return useMutation(registerUser, config);
}

export const useLogin = (config?: any) => {
	return useMutation(login, config);
}


// Queries hooks
export const useGetAuthUser = (token: string, config?: any) => {
	return useQuery(['auth-user'], () => getAuthUser(token), config);
}
