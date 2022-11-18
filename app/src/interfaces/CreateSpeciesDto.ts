export interface CreateSpeciesDto {
	scientificName: string,
	commonName?: string,
	description?: string,
	genusId?: number,
	status?: string,
	origin?: string,
	foliageType?: string,
}
