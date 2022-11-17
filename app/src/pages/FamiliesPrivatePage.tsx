import { PageSubTitle } from "../components/PageSubTitle";
import { PageTitle } from "../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
// import { getFamilies } from "../api/services";
import { Family } from "../interfaces/Family";
import { Link } from "react-router-dom";
import { useGetFamilies } from "../api/hooks";
import { useEffect, useState } from "react";
import { MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

export const FamiliesPrivatePage = () => {
  
  // Queries
  const { 
    isLoading: getFamiliesIsLoading, 
    isSuccess: getFamiliesIsSuccess, 
    data: getFamiliesData, 
    isError: getFamiliesIsError, 
    // error: getFamiliesError 
  } = useGetFamilies();

  const [ openCreate, setOpenCreate ] = useState<boolean>(false);

  const toggleCreateForm = () => {
    setOpenCreate(!openCreate);
  }

  // Mutations
  // const mutation = useMutation(postTodo, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["todos"]);
  //   },
  // });


  useEffect(() => {
    if(getFamiliesIsSuccess){
      console.log({getFamiliesData})
    }
  }, [getFamiliesIsSuccess, getFamiliesData]);

  return (
    <div className="bg-white p-3">
      <PageTitle title="Familias (vista privada)" />
      <Link to="/app/admin" className="text-danger">
        <MDBIcon fas icon="arrow-circle-left" size='2x' />
      </Link>
      <div className="d-flex justify-content-between">
        <PageSubTitle title="Listado de familias" />
        <button 
          className="btn bg-dark text-white" 
          style={{ maxHeight: '3rem' }}
          onClick={toggleCreateForm}
        >
          { openCreate ? 'Cancelar' : 'Crear' }
        </button>
      </div>

      {openCreate && (<p>RENDER CREATE FORM</p>)}

      {getFamiliesIsError && (<p className="text-danger">Error...</p>)}

      {getFamiliesIsLoading && (<p className="h4">Cargando...</p>)} 
      
      {getFamiliesIsSuccess && (
        <div className="families">
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Descripción</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
            {getFamiliesData.map((family: Family, index: number) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{family.name}</td>
                  <td>{family.description}</td>
                </tr>
              );
            })}
            </MDBTableBody>
          </MDBTable>
        </div>
      )}
    </div>
  );
};
