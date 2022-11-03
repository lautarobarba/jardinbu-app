import { PageSubTitle } from "../components/PageSubTitle";
import { PageTitle } from "../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
// import { getFamilies } from "../api/services";
import { Family } from "../interfaces/Family";
import { Link } from "react-router-dom";

export const FamiliesPrivatePage = () => {
  // Queries
  // const { isLoading, isError, data, error } = useQuery<Family[]>(
  //   ["families"],
  //   getFamilies
  // );

  // Mutations
  // const mutation = useMutation(postTodo, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["todos"]);
  //   },
  // });

  // if (isError) {
  //   console.log(error);
  //   return (
  //     <>
  //       <PageTitle title="Familias" />
  //       <PageSubTitle title="Listado de familias" />
  //       <p className="h1 text-danger">Error...</p>
  //     </>
  //   );
  // }

  return (
    <>
      <PageTitle title="Familias (vista privada)" />
      <Link to="/app/admin">Volver al Dashboard</Link>
      <PageSubTitle title="Listado de familias" />

      {/* {isLoading ? (
        <p className="h4">Buscando...</p>
      ) : (
        <div className="families">
          <ul>
            {data.map((family: Family) => {
              return <li key={family.id}>{`${family.id} - ${family.name}`}</li>;
            })}
          </ul>
        </div>
      )} */}
    </>
  );
};
