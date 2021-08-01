export const VIDEOGAME_URL = "http://localhost:3001/videogames";
export const VIDEOGAME_GENRES = "http://localhost:3001/genres";
export const VIDEOGAME_NAME = "http://localhost:3001/videogames?name=";
export const VIDEOGAME_ID = "http://localhost:3001/videogame/";

export const plataformas = ["PC", "PlayStation", "Xbox", "Nintendo", "iOS", "Android", "macOS", "Linux", "PSP", 
"Wii", "GameCube", "Game Boy", "SNES", "NES", "Apple", "Commodore", "Atari",  "SEGA"];

export const url = "https://assets.soyhenry.com/logoOG.png";


function validateDecimal(valor) {
    var RE = /^[0-4]+([.][0-9]{1,2})?$/;
    if (RE.test(valor)) {
      return true;
    } else {
      return false;
    }
  }

export const validate = (ref) => {
    if (ref.name === "" || ref.name.length <= 1 || ref.name.length >= 50) {
      return "🛑 Ingrese un nombre valido (Entre 2 y 50 caracteres)";
    }
    if (validateDecimal(ref.rating) === false) {
      return "🛑 Ingrese un rating válido (entre 0 y 5)";
    }
    if (
      ref.description === "" ||
      ref.description.length >= 1000 ||
      ref.description === undefined
    ) {
      return "🛑 Ingrese Descripcion (menor a 1000 caracteres)";
    }
    if (ref.released === undefined || ref.released === "") {
      return "🛑 Ingrese Lanzamiento";
    }
    const fecha = ref.released.split("-");
    if (fecha[0] > 2025 || fecha[0] < 2000) {
      return "🛑 El año de ingreso debe ser entre 2000 y 2025";
    }
    if (fecha[1] > 12 || fecha[1] < 1) {
      return "🛑 El Mes de ingreso no es válido";
    }
    if (fecha[2] > 31 || fecha[2] < 0) {
      return "🛑 El dia ingresado no es válido";
    }
    if (ref.genres.length === 0) {
      return "🛑 Deebe seleccionar al menos un genero";
    }
    if (ref.platforms.length === 0) {
      return "🛑 Debe seleccionar al menos una plataforma";
    }
    return true;
  };