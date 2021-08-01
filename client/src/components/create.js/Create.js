import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  VIDEOGAME_ID,
  plataformas,
  url,
  validate,
} from "../../utils/constants";
import s from "./Create.module.css";
import Nav from "../nav/Nav";
import { getVidegamesAllGenres } from "../../actions";
import img2 from "../../assets/error.png";

const Create = () => {
  const dispatch = useDispatch();

  const allGeneres = useSelector((state) => state.allGeneres);
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getVidegamesAllGenres());
  }, [dispatch]);

  const [errorlocal, setErrorLocal] = useState(state.error);

  useEffect(() => {
    setErrorLocal(state.error);
  }, [state.error]);

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    platforms: [],
    genres: [],
    released: "",
    rating: "",
    background_image: "",
  });

  const { name, description, rating, background_image } = inputs;

  function handleOnChangeBig(e) {
    e.preventDefault();
    setMensaje("");
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  const [plat, setPlataformas] = useState({
    options: [],
  });

  const onclickPlataforma = (e) => {
    e.preventDefault();
    setMensaje("");
    let plataformaEscogida = plat.options;
    if (!plataformaEscogida.some((g) => g === e.target.id)) {
      plataformaEscogida.push(e.target.id);
      e.target.style.cssText = "color: orange;";
    } else {
      plataformaEscogida = plataformaEscogida.filter((g) => g !== e.target.id);
      e.target.style.cssText = "color: white;";
    }
    setPlataformas({ options: plataformaEscogida });
  };

  const [date, setDate] = useState({
    dateOption: "",
  });

  const { dateOption } = date;

  const onChangeDate = (e) => {
    setMensaje("");
    setDate({
      ...date,
      dateOption: e.target.value,
    });
  };

  const [genero, setGenero] = useState({
    opciones: [],
  });

  const onclickGenero = (e) => {
    e.preventDefault();
    setMensaje("");
    let generoEscogidos = genero.opciones;
    if (!generoEscogidos.some((g) => g === e.target.id)) {
      generoEscogidos.push(e.target.id);
      e.target.style.cssText = "color: orange;";
    } else {
      generoEscogidos = generoEscogidos.filter((g) => g !== e.target.id);
      e.target.style.cssText = "color: white;";
    }
    setGenero({ opciones: generoEscogidos });
  };

  // function validateDecimal(valor) {
  //   var RE = /^[0-4]+([.][0-9]{1,2})?$/;
  //   if (RE.test(valor)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // const validate = (ref) => {
  //   if (ref.name === "" || ref.name.length <= 1 || ref.name.length >= 50) {
  //     return "🛑 Ingrese un nombre valido (Entre 2 y 50 caracteres)";
  //   }
  //   if (validateDecimal(ref.rating) === false) {
  //     return "🛑 Ingrese un rating válido (entre 0 y 5)";
  //   }
  //   if (
  //     ref.description === "" ||
  //     ref.description.length >= 1000 ||
  //     ref.description === undefined
  //   ) {
  //     return "🛑 Ingrese Descripcion (menor a 1000 caracteres)";
  //   }
  //   if (ref.released === undefined || ref.released === "") {
  //     return "🛑 Ingrese Lanzamiento";
  //   }
  //   const fecha = ref.released.split("-");
  //   if (fecha[0] > 2025 || fecha[0] < 2000) {
  //     return "🛑 El año de ingreso debe ser entre 2000 y 2025";
  //   }
  //   if (fecha[1] > 12 || fecha[1] < 1) {
  //     return "🛑 El Mes de ingreso no es válido";
  //   }
  //   if (fecha[2] > 31 || fecha[2] < 0) {
  //     return "🛑 El dia ingresado no es válido";
  //   }
  //   if (ref.genres.length === 0) {
  //     return "🛑 Deebe seleccionar al menos un genero";
  //   }
  //   if (ref.platforms.length === 0) {
  //     return "🛑 Debe seleccionar al menos una plataforma";
  //   }
  //   return true;
  // };

  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(true);

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let Data = {
      ...inputs,
      platforms: plat.options,
      genres: genero.opciones,
      released: date.dateOption,
    };
    Data.name = capitalizarPrimeraLetra(Data.name);
    if (Data.background_image === "") {
      Data = {
        ...Data,
        background_image: url,
      };
    }
    let aux = validate(Data);
    //Aqui Post
    if (aux === true) {
      try {
        await axios.post(VIDEOGAME_ID, Data);
      } catch (err) {
        setExito(true);
        setMensaje(
          `😓 Ups!!! ha ocurrido un error, intentalo en unos momentos`
        );
        return;
      }
      setInputs({
        name: "",
        description: "",
        platforms: [],
        rating: "",
      });
      setPlataformas({
        options: [],
      });
      setGenero({
        opciones: [],
      });
      setDate({
        dateOption: "",
      });
      setExito(false);
    } else {
      setMensaje(aux);
    }
    //fin de post
  };

  if (errorlocal === "") {
    return (
      <Fragment>
        <div className={s.contenedor_create}>
          <div className={s.nav_form}>
            <Nav />
          </div>
          {exito ? (
            <form onSubmit={handleOnSubmit} className={s.form_cont}>
              <div className={s.i_d}>
                <div className={s.form_cont_i}>
                  <div>
                    <label>Nombre</label>
                    <br />
                    <input
                      name="name"
                      type="text"
                      value={name}
                      onChange={handleOnChangeBig}
                    />
                  </div>
                  <div>
                    <label>Rating</label>
                    <br />
                    <input
                      name="rating"
                      type="number"
                      step="0.01"
                      value={rating}
                      onChange={handleOnChangeBig}
                    />
                  </div>
                  <div>
                    <label>Description</label>
                    <br />
                    <textarea
                      name="description"
                      type="text"
                      value={description}
                      onChange={handleOnChangeBig}
                    ></textarea>
                  </div>

                  <div>
                    Lanzamiento:
                    <div>
                      <input
                        type="date"
                        // min="2000-01-01"
                        // max="2025-12-31"
                        step="1"
                        name="dateOption"
                        value={dateOption}
                        onChange={onChangeDate}
                      />
                    </div>
                  </div>
                  <div>
                    <label>URL (opcional)</label>
                    <br />
                    <input
                      name="background_image"
                      type="text"
                      value={background_image}
                      onChange={handleOnChangeBig}
                    />
                  </div>
                </div>
                <div className={s.form_cont_d}>
                  <div>Selecciona genero/s</div>
                  <br />
                  <div className={s.form_cont_d_e}>
                    {allGeneres.map((e) => (
                      <div key={e.id}>
                        <button
                          onClick={onclickGenero}
                          id={e.id}
                          className={s.btn_genero}
                        >
                          {e.name}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>Selecciona plataforma/s</div>
                  <br />
                  <div className={s.form_cont_d_e}>
                    {plataformas.map((e) => (
                      <div key={e}>
                        <button
                          onClick={onclickPlataforma}
                          id={e}
                          className={s.btn_genero}
                        >
                          {e}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={s.add}>
                <button type="submit" className={s.btn_crear}>
                  CREAR
                </button>
              </div>
            </form>
          ) : (
            <div className={s.exito}>
              <h1>😊 Has creado el video juego de manera exitosa !!!</h1>
            </div>
          )}
          <div>
            <h3 className={s.mensaje}>{mensaje}</h3>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <div className={s.error}>
        <h3>Lo siento, ha ocurrido el siguiente error</h3>
        <h1>{state.error}</h1>
        <h3>Intenta ingresar en unos instantes</h3>
        <img src={img2} alt="error" />
      </div>
    );
  }
};

export default Create;
