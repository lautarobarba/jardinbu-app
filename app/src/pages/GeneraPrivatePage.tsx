import { PageSubTitle } from "../components/PageSubTitle";
import { PageTitle } from "../components/PageTitle";
import { Link } from "react-router-dom";
import { useGetGenera } from "../api/hooks";
import { useEffect, useState } from "react";
import { MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Genus } from "../interfaces/Genus";
import { CreateGenusForm } from "../forms/CreateGenusForm";

export const GeneraPrivatePage = () => {
  
  // Queries
  const { 
    isLoading: getGeneraIsLoading, 
    isSuccess: getGeneraIsSuccess, 
    data: getGeneraData, 
    isError: getGeneraIsError, 
    // error: getGeneraError 
  } = useGetGenera();

  const [ openCreate, setOpenCreate ] = useState<boolean>(false);

  const toggleCreateForm = () => {
    setOpenCreate(!openCreate);
  }

  useEffect(() => {
    if(getGeneraData){
      console.log({getGeneraData})
    }
  }, [getGeneraIsSuccess, getGeneraData]);

  return (
    <div className="bg-white p-3">
      <PageTitle title="Géneros (vista privada)" />
      <Link to="/app/admin" className="text-danger">
        <MDBIcon fas icon="arrow-circle-left" size='2x' />
      </Link>
      <div className="d-flex justify-content-between">
        <PageSubTitle title="Listado de géneros" />
        <button 
          className={openCreate ? "btn bg-danger text-white" : "btn bg-success text-white"} 
          style={{ maxHeight: '3rem' }}
          onClick={toggleCreateForm}
        >
          { openCreate ? 'Cancelar' : 'Crear' }
        </button>
      </div>

      {openCreate && (<CreateGenusForm toggleForm={setOpenCreate} />)}

      {getGeneraIsError && (<p className="text-danger">Error...</p>)}

      {getGeneraIsLoading && (<p className="h4">Cargando...</p>)} 
      
      {getGeneraIsSuccess && (
        <div className="genera">
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Descripción</th>
                <th scope='col'>Familia</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
            {getGeneraData.map((genus: Genus, index: number) => {
              return (
                <tr key={genus.id}>
                  <td>{genus.id}</td>
                  <td>{genus.name}</td>
                  <td>{genus.description}</td>
                  <td>{genus.family?.name}</td>
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
