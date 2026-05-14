import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { CharacterCard } from "../components/CharacterCard.jsx";
import { Link } from "react-router-dom";
import { LocationCard } from "../components/LocationCard.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		cargaPersonajes();
		cargarUbicaciones();
	}, [])

	const cargaPersonajes = async () => {
		let resultado = await fetch("https://rickandmortyapi.com/api/character");
		let data = await resultado.json();
		dispatch({ type: "set_personajes", payload: data.results });
	}

	const cargarUbicaciones = async () => {
		let resultado = await fetch("https://rickandmortyapi.com/api/location");
		let data = await resultado.json();
		dispatch({ type: "set_ubicaciones", payload: data.results });
	}

	return (
		<div className="home mt-2">
			<div className="titulo mb-4">
				<h1>Personajes:</h1>
			</div>
			<div className="lista-grupal-personajes">
				{store.listaPersonajes.map(e => (
					<CharacterCard
						key={e.id}
						character={e}
					/>
				))}
			</div>
			<div className="titulo mt-4 mb-4">
				<h1>Ubicación:</h1>
			</div>
			<div className="lista-grupal-ubicaciones">
				{store.listaUbicaciones.map(e => (
					<LocationCard 
						key={e.id}
						location={e}
					/>
				))}
			</div>
		</div>
	);
}; 