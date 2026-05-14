import { useParams } from "react-router-dom";
import { CharacterCard } from "../components/CharacterCard";
import { useEffect, useState } from "react";

export const Character = () => {

    const [character, setCharacter] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        cargaPersonajes(id);
        window.scrollTo(0, 0);
    }, [id])

    const cargaPersonajes = async (id) => {
        let resultado = await fetch("https://rickandmortyapi.com/api/character/" + id);
        let data = await resultado.json();
        setCharacter(data)
    }

    return (
        <div className="lista-individual">
            {character
                ? <CharacterCard character={character} />
                : <p>Cargando...</p>
            }
        </div>
    )
}