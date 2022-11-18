import { Species } from "./Species";

export interface Specimen {
  id: number,
  name: string,
  description: string,
  species: Species,
  coordLat: string,
  coordLon: string,
  createdAt: Date,
  updatedAt: Date,
  deleted: boolean,
}
