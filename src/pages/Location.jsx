import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LocationCard } from "../components/LocationCard";

export const Location = () => {

    const [location, setLocation] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        cargaUbicacion(id);
        window.scrollTo(0, 0);
    }, [id])

    const cargaUbicacion = async (id) => {
        let resultado = await fetch("https://rickandmortyapi.com/api/location/" + id);
        let data = await resultado.json();
        setLocation(data)
    }

    return (
        <div className="lista-individual">
            {location
                ? <LocationCard location={location} />
                : <p>Cargando...</p>
            }
        </div>
    )
}