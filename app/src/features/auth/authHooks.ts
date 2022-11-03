import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentSession } from "./authSlice";

export const useUserIsLogin = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const logueado = useAppSelector(selectCurrentSession);

}

export const useUserRole = () => {

}
