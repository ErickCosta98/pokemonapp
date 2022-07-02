// import logo from './logo.svg';
import './App.css';
import logo from  './pokelogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//funcion para mostrar los pokemon en las tarjetas de la pagina principal desde la pokeapi
function getPokemon() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=250&offset=0'; //offset=20&limit=20
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemons = data.results;
      pokemons.forEach(pokemon => {
        const card = getCard(pokemon);
        document.getElementById('pokemon').appendChild(card);
      });
    }).catch(error => console.log(error));
}
// funcion para mostrar los detalles de los pokemon extendiendo el card de la pagina principal
// function getPokemonDetail(e,url) {
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const pokemon = data;
//       const card = document.createElement('div');
//       card.classList.add('card-more-details');
//       const type = document.createElement('p');
//       type.innerHTML = pokemon.types.map(type => type.type.name).join(', ');
//       const height = document.createElement('p');
//       height.innerHTML = `Height: ${pokemon.height}`;
//       const weight = document.createElement('p');
//       weight.innerHTML = `Weight: ${pokemon.weight}`;
//       card.appendChild(type);
//       card.appendChild(height);
//       card.appendChild(weight);
//       e.target.appendChild(card);
//     }).catch(error => console.log(error));
// }

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
      document.getElementById('pokemon').innerHTML = '';
      pokemons.forEach(pokemon => {
        const card = getCard(pokemon);
        document.getElementById('pokemon').appendChild(card);
      });
    }).catch(error => console.log(error));
}

//funcion para generar card
function getCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('micard');
  const cardDetails = document.createElement('div');
  cardDetails.classList.add('card-details');
  const img = document.createElement('img');
  img.className = 'micard-img-top';
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;
  const name = document.createElement('h2');
  name.innerHTML = pokemon.name;
  cardDetails.appendChild(img);
  cardDetails.appendChild(name);
  // card.addEventListener('click', (e) => {
  //   getPokemonDetail(e,pokemon.url);
  // });
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
        const card = getCard(pokemon.pokemon);
        document.getElementById('pokemon').appendChild(card);
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


getPokemon();
getGenerations();
getTypes();
function App() {
  return (
      <div className="App-header" >
        <div className="minav">
          <div className="minav-bar">
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <a className="navbar-brand" href="/"> <img src={logo} className='logo' alt='logo'/></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  
                 
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-white" href="/#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Generaciones
                    </a>
                    <ul className="dropdown-menu" id='generations' aria-labelledby="navbarScrollingDropdown">                      
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-white" href="/#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Tipos de pokemon
                    </a>
                    <ul className="dropdown-menu" id='types' aria-labelledby="navbarScrollingDropdown">                      
                    </ul>
                  </li>
                </ul>
              </div>
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
