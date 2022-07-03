import './App.css';
import logo from  './pokelogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2';
//funcion para mostrar los pokemon en las tarjetas de la pagina principal desde la pokeapi
function getPokemon() {
  const url ='https://pokeapi.co/api/v2/pokemon?limit=250&offset=0'; //offset=20&limit=20
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemons = data.results;
      //limpiar la lista de pokemon
      document.getElementById('pokemon').innerHTML = '';
      pokemons.forEach(pokemon => {
        fetch(pokemon.url)
          .then(response => response.json())
          .then(data => {
            const card = getCard(data);
            document.getElementById('pokemon').appendChild(card);
          }).catch(error => console.log(error));
      });
    }).catch(error => console.log(error));
}

//funcion mostrar lista de generaciones de pokemon
function getGenerations() {
  const url = 'https://pokeapi.co/api/v2/generation/';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const generations = data.results;
      generations.forEach(generation => {
        const li = document.createElement('li');
        const option = getOption(generation);
        li.appendChild(option);
        option.addEventListener('click', (e) => {
          getPokemonByGeneration(e);
        });
        document.getElementById('generations').appendChild(li);
      });
    }).catch(error => console.log(error));
}


function getPokemonByGeneration (e) {
  e.preventDefault();
  const url = e.target.href;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemons = data.pokemon_species;
      //limpiar la lista de pokemon
      console.log(pokemons)
      document.getElementById('pokemon').innerHTML = '';
      pokemons.forEach(pokemon => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          .then(response => response.json())
          .then(data => {
            const card = getCard(data);
            document.getElementById('pokemon').appendChild(card);
          }).catch(error => console.log(error));
      });
      });
}

//funcion para generar card
function getCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('micard');
  const cardDetails = document.createElement('div');
  cardDetails.classList.add('card-details');
  const img = document.createElement('img');
  img.className = 'micard-img-top';
  img.src = pokemon.sprites.front_default;
  const name = document.createElement('h2');
  name.innerHTML = `${pokemon.name}  #${pokemon.id}`;
  cardDetails.appendChild(img);
  cardDetails.appendChild(name);
  // agrgar estadisticas al card
  const stats = document.createElement('div');
  stats.classList.add('stats', 'm-5');
  pokemon.stats.forEach(stat => {
    const bar = document.createElement('div');
    bar.classList.add('progress','mb-2');
    const p = document.createElement('div');
    p.classList.add('progress-bar','bg-success','bg-opacity-25');
    var porcentaje = (stat.base_stat / 255) * 255;
    var porcentajeRestante = 255 - porcentaje;
    p.style.width = `${porcentajeRestante}%`;
    const st = document.createElement('div');
    st.classList.add('progress-bar','bg-success');
    st.style.width = `${porcentaje}%`;
    st.innerHTML = `${stat.stat.name} ${stat.base_stat}`;
    bar.appendChild(st);
    bar.appendChild(p);
    stats.appendChild(bar);
  });
  cardDetails.appendChild(stats);
  card.appendChild(cardDetails);
  return card;
}
//funcion para mostrar la lista de tipos de pokemon
function getTypes() {
  const url = 'https://pokeapi.co/api/v2/type/';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const types = data.results;
      types.forEach(type => {
        const li = document.createElement('li');
        const option = getOption(type);
        li.appendChild(option);
        option.addEventListener('click', (e) => {
          getPokemonByType(e);
        });
        document.getElementById('types').appendChild(li);
      });
    }).catch(error => console.log(error));
}
//funcion para mostrar la lista de pokemon por tipo
function getPokemonByType (e) {
  e.preventDefault();
  const url = e.target.href;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemons = data.pokemon;
      //limpiar la lista de pokemon
      document.getElementById('pokemon').innerHTML = '';
      pokemons.forEach(pokemon => {
        fetch(pokemon.pokemon.url)
          .then(response => response.json())
          .then(data => {
            const card = getCard(data);
            document.getElementById('pokemon').appendChild(card);
          }).catch(error => console.log(error));
      });
    }).catch(error => console.log(error));
}

function getOption(pokemon){
  const option = document.createElement('a');
  option.className = 'dropdown-item';
  option.innerHTML = pokemon.name;
  option.href = pokemon.url;
  return option;
}
//funcion para abrir el buscardor de pokemons con sweetalert2
function openSearch() {
  Swal.fire({
    title: 'Ingrese el nombre del pokemon',
    input: 'text',
    inputAttributes: {
      id: 'search',
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Buscar',
    showLoaderOnConfirm: true,
    preConfirm: (search) => {
      getPokemonByName(search);
    },
    
  })
}
//funcion para buscar pokemon por nombre, mostrar todos sus detalles y mostrarlo en la pagina principal
function getPokemonByName(pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // limpiar la lista de pokemon
      document.getElementById('pokemon').innerHTML = '';
      const card = getCard(data);
      document.getElementById('pokemon').appendChild(card);
    }).catch(error => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El pokemon no existe!',
      }));
}



getPokemon();
getGenerations();
getTypes();
function App() {
  return (
      <div className="App-header" >
        <div className="minav">
          <div className="minav-bar">
          <nav className='nav-items'>
            <a href="/"> <img src={logo} className='logo' alt='logo' /></a>
            <div>
            <a className="dropdown dropdown-toggle link-nav" href="/#" id="DropGenerations" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Generaciones
            </a>
            <ul className="dropdown-menu" id='generations' aria-labelledby="DropGenerations">
            </ul>
            </div>
            <div>
              <a className="dropdown dropdown-toggle link-nav" href="/#" id="DropTypes" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Tipos
              </a>
              <ul className="dropdown-menu" id='types' aria-labelledby="DropTypes">
              </ul>
            </div>
            <div className='searchDiv'>
              <a className='text-left btnsearch' onClick={openSearch} href='/#' ><i className='fa fa-search'></i> <label>BUSCAR</label></a>
            </div>

          </nav>
        </div>
        </div>

        <div className="container-logo">
        <img src={logo} className="App-logo" alt="logo"/>
          </div>
        
        <div className="micards" id='pokemon'>
        </div>

      </div>
      
  );
}



export default App;
