import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CharacterCard = ({ character }) => {
  const { name, image, status, gender, species, origin, location, episode, created, id } = character;

  const createdDate = new Date(created).toLocaleDateString("es-ES", {
    day: "2-digit", month: "short", year: "numeric"
  });

  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  return (
    <div className="card" style={{ width: "340px" }}>
      <div onClick={() => navigate(`/Character/${character.id}`)} >
        <div className="position-relative">
          <img src={image} className="card-img-top" alt={name} style={{ height: "200px", objectFit: "cover" }} />
          <span className="badge position-absolute top-0 end-0 m-2"
            style={{ background: status === "Alive" ? "#1a6b3c" : "#6b1a1a", color: status === "Alive" ? "#6ee7a0" : "#e7706e" }}>
            ● {status}
          </span>
          <span className="badge bg-dark bg-opacity-50 position-absolute top-0 start-0 m-2">#{id}</span>
        </div>

        <div className="card-body">
          <h5 className="card-title mb-0">{name}</h5>
          <p className="text-muted mb-3" style={{ fontSize: "13px" }}>{species} · {gender}</p>

          <div className="row g-2 mb-3">
            <div className="col-6">
              <div className="bg-light rounded p-2">
                <small className="text-muted d-block text-uppercase" style={{ fontSize: "11px" }}>Origen</small>
                <span style={{ fontSize: "13px" }}>{origin?.name}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="bg-light rounded p-2">
                <small className="text-muted d-block text-uppercase" style={{ fontSize: "11px" }}>Ubicación</small>
                <span style={{ fontSize: "13px" }}>{location?.name}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="bg-light rounded p-2">
                <small className="text-muted d-block text-uppercase" style={{ fontSize: "11px" }}>Especie</small>
                <span style={{ fontSize: "13px" }}>{species}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="bg-light rounded p-2">
                <small className="text-muted d-block text-uppercase" style={{ fontSize: "11px" }}>Episodios</small>
                <span style={{ fontSize: "13px" }}>{episode?.length} episodios</span>
              </div>
            </div>
          </div>

          <p className="text-muted text-end mb-0" style={{ fontSize: "11px" }}>Creado: {createdDate}</p>

        </div>
      </div>
      <div className="text-center mt-auto pb-4">
        {!store.listaFavoritos.includes(name)?
          <i onClick={() => dispatch({ type: "añadir_favorito", payload: name })} style={{ color: "green" }} className="fa-solid fa-heart-circle-plus fs-2"></i>:
          <i onClick={() => dispatch({ type: "eliminar_favorito", payload: name })} style={{ color: "red" }} className="fa-solid fa-heart-circle-minus fs-2"></i>
        }
      </div>
    </div>
  );
};