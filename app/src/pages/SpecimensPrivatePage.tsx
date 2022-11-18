import { PageSubTitle } from "../components/PageSubTitle";
import { PageTitle } from "../components/PageTitle";
import { Link } from "react-router-dom";
import { useGetSpecimens } from "../api/hooks";
import { useEffect, useState } from "react";
import { MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Specimen } from "../interfaces/Specimen";
import { CreateSpecimenForm } from "../forms/CreateSpecimenForm";

export const SpecimensPrivatePage = () => {

  // Queries
  const { 
    isLoading: getSpecimensIsLoading, 
    isSuccess: getSpecimensIsSuccess, 
    data: getSpecimensData, 
    isError: getSpecimensIsError, 
    // error: getSpecimensError 
  } = useGetSpecimens();

  const [ openCreate, setOpenCreate ] = useState<boolean>(false);

  const toggleCreateForm = () => {
    setOpenCreate(!openCreate);
  }

  useEffect(() => {
    if(getSpecimensIsSuccess){
      console.log({getSpecimensData})
    }
  }, [getSpecimensIsSuccess, getSpecimensData]);

  return (
    <div className="bg-white p-3">
      <PageTitle title="Ejemplares (vista privada)" />
      <Link to="/app/admin" className="text-danger">
        <MDBIcon fas icon="arrow-circle-left" size='2x' />
      </Link>
      <div className="d-flex justify-content-between">
        <PageSubTitle title="Listado de ejemplares" />
        <button 
          className={openCreate ? "btn bg-danger text-white" : "btn bg-success text-white"} 
          style={{ maxHeight: '3rem' }}
          onClick={toggleCreateForm}
        >
          { openCreate ? 'Cancelar' : 'Crear' }
        </button>
      </div>

      {openCreate && (<CreateSpecimenForm toggleForm={setOpenCreate} />)}

      {getSpecimensIsError && (<p className="text-danger">Error...</p>)}

      {getSpecimensIsLoading && (<p className="h4">Cargando...</p>)} 
      
      {getSpecimensIsSuccess && (
        <div className="specimens">
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Descripción</th>
                <th scope='col'>Especie</th>
                <th scope='col'>Género</th>
                <th scope='col'>Familia</th>
                <th scope='col'>Coord. Latitud</th>
                <th scope='col'>Coord. Longitud</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
            {getSpecimensData.map((specimen: Specimen, index: number) => {
              return (
                <tr key={specimen.id}>
                  <td>{specimen.id}</td>
                  <td>{specimen.name}</td>
                  <td>{specimen.description}</td>
                  <td>{specimen.species?.scientificName} - {specimen.species?.commonName}</td>
                  <td>{specimen.species?.genus?.name}</td>
                  <td>{specimen.species?.genus?.family?.name}</td>
                  <td>{specimen.coordLat}</td>
                  <td>{specimen.coordLon}</td>
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
