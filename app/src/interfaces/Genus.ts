import { Family } from "./Family";

export interface Genus {
  id: number;
  name: string;
  description: string;
  family: Family
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}
