import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

export function LocationCard({ location }) {

  const { id, name, type, dimension, residents = [], url, created } = location;

  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  return (
    <div className="card border border-secondary-subtle rounded-4 p-3">
      <div onClick={() => navigate(`/location/${location.id}`)} >
        {/* Header */}
        <div className="card-header bg-transparent border-0 d-flex align-items-center gap-3 pb-2">
          <div
            className="rounded-circle bg-info bg-opacity-10 d-flex align-items-center justify-content-center"
            style={{ width: 56, height: 56, fontSize: 28 }}
          >
            🌍
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
              <small className="text-muted fw-semibold">ID #{id}</small>
              <span className="badge bg-primary bg-opacity-10 text-primary">{type}</span>
              <span className="badge bg-success bg-opacity-10 text-success">{dimension}</span>
            </div>
            <h5 className="mb-0 fw-semibold">{name}</h5>
          </div>
        </div>

        <hr className="my-2" />

        {/* Info grid */}
        <div className="card-body px-2 py-0">
          <div className="row g-2 mb-3">
            <div className="col-6">
              <div className="bg-light rounded-3 p-2">
                <div className="text-muted small text-uppercase" style={{ fontSize: 11, letterSpacing: '0.05em' }}>
                  Tipo
                </div>
                <div className="fw-semibold">{type}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="bg-light rounded-3 p-2">
                <div className="text-muted small text-uppercase" style={{ fontSize: 11, letterSpacing: '0.05em' }}>
                  Dimensión
                </div>
                <div className="fw-semibold">{dimension}</div>
              </div>
            </div>
            <div className="col-12">
              <div className="bg-light rounded-3 p-2">
                <div className="text-muted small text-uppercase" style={{ fontSize: 11, letterSpacing: '0.05em' }}>
                  Residentes
                </div>
                <div className="fw-semibold">{residents.length} personajes</div>
              </div>
            </div>
          </div>

          {/* Residents list */}
          {residents.length > 0 && (
            <>
              <div className="text-muted small text-uppercase mb-2" style={{ fontSize: 11, letterSpacing: '0.05em' }}>
                URLs de residentes
              </div>
              <ul className="list-group list-group-flush">
                {residents.slice(0, 5).map((url, index) => (
                  <li key={index} className="list-group-item px-0 py-1 border-0 d-flex align-items-center gap-2">
                    <div
                      className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center text-success"
                      style={{ width: 28, height: 28, fontSize: 11, fontWeight: 600 }}
                    >
                      {index + 1}
                    </div>
                    <a href={url} className="text-decoration-none text-muted small" target="_blank" rel="noreferrer">
                      {url}
                    </a>
                  </li>
                ))}
                {residents.length > 5 && (
                  <li className="list-group-item px-0 py-1 border-0 text-muted small">
                    +{residents.length - 5} más...
                  </li>
                )}
              </ul>
            </>
          )}

          {/* Footer meta */}
          {(url || created) && (
            <>
              <hr className="my-2" />
              <div className="d-flex justify-content-between flex-wrap gap-1">
                {url && (
                  <a href={url} className="btn btn-sm btn-outline-secondary rounded-3" target="_blank" rel="noreferrer">
                    Ver en API
                  </a>
                )}
                {created && (
                  <small className="text-muted align-self-center">
                    Creado: {new Date(created).toLocaleDateString()}
                  </small>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="text-center mt-auto pb-4">
        {!store.listaFavoritos.includes(name) ?
          <i onClick={() => dispatch({ type: "añadir_favorito", payload: name })} style={{ color: "green" }} className="fa-solid fa-heart-circle-plus fs-2"></i> :
          <i onClick={() => dispatch({ type: "eliminar_favorito", payload: name })} style={{ color: "red" }} className="fa-solid fa-heart-circle-minus fs-2"></i>
        }
      </div>
    </div>
  );
}