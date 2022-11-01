export interface User {
	id: number,
	email: string,
	isEmailConfirmed: boolean,
	firstname: string,
	lastname: string,
	profilePicture?: {
		id: number,
		fileName: string,
		path: string,
		mimetype: string,
		originalName: string,
		createdAt: Date,
		updatedAt: Date,
		deleted: boolean,
		fileDeleted: boolean
	},
	status: string,
	role: string,
	createdAt: Date,
	updatedAt: Date,
	deleted: boolean
}