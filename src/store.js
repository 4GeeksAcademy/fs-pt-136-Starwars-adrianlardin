export const initialStore=()=>{
  return{
    listaPersonajes: [],
    listaUbicaciones: [],
    listaFavoritos: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "set_personajes":
      return { ...store, listaPersonajes: action.payload };

    case "set_ubicaciones":
      return { ...store, listaUbicaciones: action.payload };
    
    case "set_favoritos":
      return { ...store, listaFavoritos: action.payload };

    case "añadir_favorito":
      if (store.listaFavoritos.includes(action.payload)) {
        return store;
      }
      return { ...store, listaFavoritos: [...store.listaFavoritos, action.payload] };
    
    case "eliminar_favorito":
      return { ...store, listaFavoritos: store.listaFavoritos.filter(favorito => favorito !== action.payload) };

    default:
      throw Error('Unknown action.');
  }    
}
