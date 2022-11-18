import { Picture } from "./Picture";

export interface User {
	id: number,
	email: string,
	isEmailConfirmed: boolean,
	firstname: string,
	lastname: string,
	profilePicture?: Picture,
	status: string,
	role: string,
	createdAt: Date,
	updatedAt: Date,
	deleted: boolean
}