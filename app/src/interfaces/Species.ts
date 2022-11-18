import { Genus } from "./Genus";
import { Picture } from "./Picture";

export interface Species {
  id: number,
  scientificName: string,
  commonName: string,
  description: string,
  genus: Genus
  status: string,
  origin: string,
  exampleImg?: Picture,
  foliageType: string,
  foliageImg?: Picture,
  createdAt: Date,
  updatedAt: Date,
  deleted: boolean,
}
