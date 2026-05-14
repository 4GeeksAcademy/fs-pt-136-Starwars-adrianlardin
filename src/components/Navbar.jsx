import { Link } from "react-router-dom";
import RickAndMorty from "../assets/img/rick_morty_icon.png"
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();

	const eliminarFavoritos = (name) => {
		let nuevaLista = store.listaFavoritos.filter(favorito => favorito !== name)
		dispatch({ type: "set_favoritos", payload: nuevaLista });
	}

	console.log(store.listaFavoritos)

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<img className="img-navbar" src={RickAndMorty} alt="The Rick and Morty" />
				</Link>
				<div className="ml-auto">
					{/*<!-- Dropdown -->*/}
					<div className="nav-item dropdown">
						<a
							className="nav-link dropdown-toggle"
							href="#"
							role="button"
							data-bs-toggle="dropdown"
						>
							Favoritos {store.listaFavoritos.length}
						</a>
						<ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: "280px" }}>
							{store.listaFavoritos.map(e => (
								<li key={e} className="ms-3">
									{e} <i onClick={() => eliminarFavoritos(e)} style={{ color: "red" }} className="fa-solid fa-trash-can"></i>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};