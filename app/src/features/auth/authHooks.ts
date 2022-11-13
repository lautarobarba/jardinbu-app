import { useAppSelector } from "../../redux/hooks";
import { selectCurrentSession, selectCurrentUser } from "./authSlice";

export const useUserIsAuthenticated = () => {
	const session = useAppSelector(selectCurrentSession);
	const isAuthenticated = session ? true : false;
	return isAuthenticated;
}

export const useCurrentUser = () => {
	const user = useAppSelector(selectCurrentUser);
	return user;
}

export const useUserRole = () => {
	const user = useAppSelector(selectCurrentUser);
	return user?.role;
}

export const useJwtToken = () => {
	const session = useAppSelector(selectCurrentSession);
	return session?.accessToken;
}
