import Axios from "axios";
import { QueryClient } from "@tanstack/react-query";

// Create a client for QueryClientProvider
export const queryClient = new QueryClient();

// Client for fetch
// const client = Axios.create({
//   baseURL: "http://localhost:7001/api/",
//   timeout: 10 * 1000, // 10 sec
// });

const baseURL: string = "http://localhost:7001/api/";

// FindAll
export const getFamilies = async () => {
  const response = await fetch(`${baseURL}family`);
  return response.json();
  // return client.get("families");
};

export const getSpecies = async () => {
  const response = await fetch("http://localhost/api/species");
  return response.json();
  // return client.get("species");
};
