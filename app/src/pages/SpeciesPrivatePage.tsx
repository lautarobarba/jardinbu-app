import { PageSubTitle } from "../components/PageSubTitle";
import { PageTitle } from "../components/PageTitle";
import { Link } from "react-router-dom";
import { useGetSpecies } from "../api/hooks";
import { useEffect, useState } from "react";
import { MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Species } from "../interfaces/Species";
import { CreateSpeciesForm } from "../forms/CreateSpeciesForm";

export const SpeciesPrivatePage = () => {

  // Queries
  const { 
    isLoading: getSpeciesIsLoading, 
    isSuccess: getSpeciesIsSuccess, 
    data: getSpeciesData, 
    isError: getSpeciesIsError, 
    // error: getSpeciesError 
  } = useGetSpecies();

  const [ openCreate, setOpenCreate ] = useState<boolean>(false);

  const toggleCreateForm = () => {
    setOpenCreate(!openCreate);
  }

  useEffect(() => {
    if(getSpeciesIsSuccess){
      console.log({getSpeciesData})
    }
  }, [getSpeciesIsSuccess, getSpeciesData]);

  return (
    <div className="bg-white p-3">
      <PageTitle title="Especies (vista privada)" />
      <Link to="/app/admin" className="text-danger">
        <MDBIcon fas icon="arrow-circle-left" size='2x' />
      </Link>
      <div className="d-flex justify-content-between">
        <PageSubTitle title="Listado de especies" />
        <button 
          className={openCreate ? "btn bg-danger text-white" : "btn bg-success text-white"} 
          style={{ maxHeight: '3rem' }}
          onClick={toggleCreateForm}
        >
          { openCreate ? 'Cancelar' : 'Crear' }
        </button>
      </div>

      {openCreate && (<CreateSpeciesForm toggleForm={setOpenCreate} />)}

      {getSpeciesIsError && (<p className="text-danger">Error...</p>)}

      {getSpeciesIsLoading && (<p className="h4">Cargando...</p>)} 
      
      {getSpeciesIsSuccess && (
        <div className="species">
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Nombre científico</th>
                <th scope='col'>Nombre común</th>
                <th scope='col'>Descripción</th>
                <th scope='col'>Género</th>
                <th scope='col'>Familia</th>
                <th scope='col'>Estado</th>
                <th scope='col'>Origen</th>
                <th scope='col'>Tipo de follajes</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
            {getSpeciesData.map((species: Species, index: number) => {
              return (
                <tr key={species.id}>
                  <td>{species.id}</td>
                  <td>{species.scientificName}</td>
                  <td>{species.commonName}</td>
                  <td>{species.description}</td>
                  <td>{species.genus?.name}</td>
                  <td>{species.genus?.family?.name}</td>
                  <td>{species.status}</td>
                  <td>{species.origin}</td>
                  <td>{species.foliageType}</td>
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
