export interface UpdateUserDto {
	id: number;
	email?: string;
	isEmailConfirmed?: boolean;
	firstname: string;
	lastname: string;
	// profilePicture?: Express.Multer.File;
	status?: string;
	// role?: Role;
}