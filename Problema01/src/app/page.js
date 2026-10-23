"use client";

import { useMemo, useState } from "react";

const nombresKanto = [
  "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
  "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
  "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata",
  "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu",
  "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂",
  "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales",
  "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume",
  "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth",
  "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine",
  "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop",
  "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool",
  "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke",
  "Slowbro", "Magnemite", "Magneton", "Farfetch’d", "Doduo", "Dodrio", "Seel",
  "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter",
  "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb",
  "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee",
  "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey",
  "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu",
  "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir",
  "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon",
  "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops",
  "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair",
  "Dragonite", "Mewtwo", "Mew"
];

const tipos = [
  "Normal", "Fuego", "Agua", "Planta", "Eléctrico", "Hielo", "Lucha", "Veneno",
  "Tierra", "Volador", "Psíquico", "Bicho", "Roca", "Fantasma", "Dragón"
];

const obtenerSprite = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

//inicio de caracteristicas por defecto
export default function Problema01() {
  const [pokemon, setPokemon] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("Todos");

  const [numero, setNumero] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("Normal");
  const [nivel, setNivel] = useState("5");
  const [urlImagen, setUrlImagen] = useState("");
  const [archivoImagen, setArchivoImagen] = useState(null);

  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

//filtro de busqueda
  const visibles = useMemo(() => {
    return pokemon.filter((registro) => {
      const texto = busqueda.toLowerCase();
      const coincideNombre =
        registro.nombre.toLowerCase().includes(texto) ||
        String(registro.id).includes(texto);
      const coincideTipo =
        tipoFiltro === "Todos" || registro.tipo === tipoFiltro;

      return coincideNombre && coincideTipo;
    });
  }, [pokemon, busqueda, tipoFiltro]);

//seleccion de imagen

  function manejarArchivo(evento) {
    const archivo = evento.target.files?.[0];

    if (!archivo) {
      setArchivoImagen(null);
      return;
    }
//validacion del archivo seleccionado
    if (!archivo.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");
      evento.target.value = "";
      return;
    }

    setError("");
    setArchivoImagen(archivo);
    setUrlImagen("");
  }

//autocompletaar el nombre del pokemon conociendo su "id"
  function manejarNumero(evento) {
    const valor = evento.target.value;
    const idIngresado = Number(valor);

    setNumero(valor);

    if (
      valor &&
      idIngresado >= 1 &&
      idIngresado <= 151 &&
      nombresKanto[idIngresado - 1]
    ) {
      setNombre(nombresKanto[idIngresado - 1]);
    } else if (!valor) {
      setNombre("");
    }
  }


//agrega para mostrar el pokemon
  function agregarPokemon(evento) {
    evento.preventDefault();
    setError("");
    setAviso("");

    const id = Number(numero);
    const nivelNumero = Number(nivel);
//validacion de informacion
    if (!numero || !nombre.trim() || !tipo || !nivel) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    if (!Number.isInteger(id) || id < 1 || id > 151) {
      setError(
        "El número de Pokédex debe estar entre 1 y 151 (primera generación)."
      );
      return;
    }

    if (pokemon.some((registro) => registro.id === id)) {
      setError(
        `El número #${String(id).padStart(3, "0")} ya está en la Pokédex.`
      );
      return;
    }

    if (
      !Number.isInteger(nivelNumero) ||
      nivelNumero < 1 ||
      nivelNumero > 100
    ) {
      setError("El nivel debe ser un número entre 1 y 100.");
      return;
    }


//imagen a utilizar
    const imagen = archivoImagen//archivo local subido
      ? URL.createObjectURL(archivoImagen)//usar url
      : urlImagen.trim() || obtenerSprite(id);//llamado a la api


      //arreglo para guardar el objeto a mostrar
    const nuevoPokemon = {
      id,
      nombre: nombre.trim(),
      tipo,
      nivel: nivelNumero,
      imagen,
      original: false
    };
//agregar los pokemons y generar la actualizacion en la interfaz
    setPokemon((actuales) =>
      [...actuales, nuevoPokemon].sort((a, b) => a.id - b.id)//se ordenan de menor a mayor
    );

    setNombre("");
    setNumero("");
    setTipo("Normal");
    setNivel("5");
    setUrlImagen("");
    setArchivoImagen(null);
    evento.target.reset();

    setAviso(
      `${nuevoPokemon.nombre} se agregó correctamente a la Pokédex.`
    );
  }

  function manejarErrorImagen(evento) {
    evento.currentTarget.onerror = null;
    evento.currentTarget.src = obtenerSprite(0);
  }

  return (
    <main className="page-shell" id="inicio">
      <header className="topbar">
        <a className="brand" href="#inicio">
          <span className="brand-ball" aria-hidden="true">
            <span className="brand-ball-center" />
              </span>
          <span>
            POKÉDEX
            <small>PRIMERA GENERACIÓN</small>
          </span>
        </a>

        <div className="top-meta">
          <span className="status-dot" />
          SISTEMA EN LÍNEA
          <b>GEN I</b>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">REGIÓN KANTO · #001–#151</p>
          <h1>
            Tu aventura
            <br />
            <em>comienza aquí.</em>
          </h1>
          <p className="hero-text">
            Registra, organiza y consulta los Pokémon de la primera generación.
            Tu colección, tu investigación.
          </p>
          <a className="primary-link" href="#registro">
            + Registrar Pokémon
            <span aria-hidden="true">↘</span>
          </a>
        </div>

        
<div className="hero-gengar">
          <img
            src="/iniciales/gengar.png"
            alt="Gengar"
          />
        </div>


        <div className="hero-index">
          001 — 151 <span>/ REGIÓN KANTO</span>
        </div>
      </section>

      <section className="stats-row" aria-label="Resumen de la colección">
        <div>
          <span className="stat-label">POKÉMON REGISTRADOS</span>
          <strong>
            {pokemon.length}
            <small> Pokémon</small>
          </strong>
        </div>

        <div>
          <span className="stat-label">PRIMERA GENERACIÓN</span>
          <strong>
            151
            <small> especies</small>
          </strong>
        </div>

      </section>

      <section className="content-grid" id="registro">
        <div className="form-panel">
          <div className="section-heading">
            <span className="section-number">01 /</span>
            <div>
              <h2>Nuevo registro</h2>
              <p>Añade un Pokémon a tu base de datos.</p>
            </div>
          </div>

          <form onSubmit={agregarPokemon} className="pokemon-form">
            <label>
              Número de Pokédex <span>*</span>
              <div className="input-prefix">
                <b>#</b>
                <input
                  type="number"
                  min="1"
                  max="151"
                  placeholder="Ej. 25"
                  value={numero}
                  onChange={manejarNumero}
                  required
                />
              </div>
              <small>Solo números del 1 al 151.</small>
            </label>

            <label>
              Nombre del Pokémon <span>*</span>
              <input
                type="text"
                placeholder="Ej. Pikachu"
                maxLength={40}
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
                required
              />
            </label>

            <div className="form-two">
              <label>
                Tipo principal <span>*</span>
                <select
                  value={tipo}
                  onChange={(evento) => setTipo(evento.target.value)}
                  required
                >
                  {tipos.map((tipoPokemon) => (
                    <option key={tipoPokemon} value={tipoPokemon}>
                      {tipoPokemon}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Nivel <span>*</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={nivel}
                  onChange={(evento) => setNivel(evento.target.value)}
                  required
                />
              </label>
            </div>

            <label>
              Imagen del Pokémon{" "}
              <small className="optional">(opcional)</small>
              <input
                type="url"
                placeholder="https://... (URL de imagen)"
                value={urlImagen}
                onChange={(evento) => {
                  setUrlImagen(evento.target.value);
                  if (evento.target.value) {
                    setArchivoImagen(null);
                  }
                }}
              />

              <span className="or-divider">
                O selecciona un archivo desde tu equipo
              </span>

              <input
                className="file-input"
                type="file"
                accept="image/*"
                onChange={manejarArchivo}
              />

              <small>
                Si no proporcionas una imagen, se usará el sprite asociado al
                número.
              </small>
            </label>

            {error && (
              <p className="feedback error" role="alert">
                ⚠ {error}
              </p>
            )}

            {aviso && (
              <p className="feedback success" role="status">
                ✓ {aviso}
              </p>
            )}

            <button className="submit-button" type="submit">
              Agregar a la Pokédex
              <span aria-hidden="true">↗</span>
            </button>
          </form>
        </div>

        <div className="collection-panel">
          <div className="section-heading collection-title">
            <span className="section-number">02 /</span>
            <div>
              <h2>Archivo Pokémon</h2>
              <p>Registra especies de Kanto, del #001 al #151.</p>
            </div>
          </div>

          <div className="filters">
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Buscar por nombre o número..."
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
              />
            </label>

            <select
              aria-label="Filtrar por tipo"
              value={tipoFiltro}
              onChange={(evento) => setTipoFiltro(evento.target.value)}
            >
              <option value="Todos">Todos los tipos</option>
              {tipos.map((tipoPokemon) => (
                <option key={tipoPokemon} value={tipoPokemon}>
                  {tipoPokemon}
                </option>
              ))}
            </select>
          </div>

          <div className="collection-caption">
            <span>POKÉMON REGISTRADOS</span>
            <span>{visibles.length} RESULTADOS</span>
          </div>

          {visibles.length > 0 ? (
            <div className="pokemon-grid"> 
              {visibles.map((registro) => (
                <article 
                  className="pokemon-card"
                  key={`${registro.id}-${registro.nombre}`}//mostrar los pokemosn ya registrados en el grid, el map recorre los arreglos creados y genera una tarjeta por cada uno
                >
                  <div className="card-top">
                    <span>
                      NO. {String(registro.id).padStart(3, "0")}
                    </span>
                    <span className="card-dot" />
                  </div>

                  <div className="sprite-wrap">
                    <img
                      src={registro.imagen}
                      alt={registro.nombre}
                      onError={manejarErrorImagen}
                      loading="lazy"
                    />
                  </div>

                  <h3>{registro.nombre}</h3>

                  <div className="card-details">
                    <span className="type-pill">{registro.tipo}</span>
                    <span>Nv. {registro.nivel}</span>
                  </div>

                  {registro.original && (
                    <span className="registered-tag">KANTO</span>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span aria-hidden="true">⌕</span>
              <h3>No hay resultados</h3>
              <p>Prueba otra búsqueda o cambia el filtro de tipo.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <span>
          POKÉDEX AZUL <b>·</b> PROYECTO REACT
        </span>
        <span>
          HECHO PARA ENTRENADORES DE KANTO <b>UDB 2026</b>
        </span>
      </footer>
    </main>
  );
}
