import { boolean } from "yup";
import { Picture } from "./Picture";
import { Role, Status } from "./User";

export interface UpdateUserDto {
	id: number,
	email?: string,
	isEmailConfirmed?: boolean,
	firstname?: string,
	lastname?: string,
	profilePicture?: Picture,
	status?: Status,
	role?: Role,
}