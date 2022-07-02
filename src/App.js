// import logo from './logo.svg';
import './App.css';


//funcion para mostrar los pokemon en las tarjetas de la pagina principal desde la pokeapi
function getPokemon() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'; //offset=20&limit=20
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemons = data.results;
      pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('card');
        const cardDetails = document.createElement('div');
        cardDetails.classList.add('card-details');
        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;
        const name = document.createElement('h2');
        name.innerHTML = pokemon.name;
        cardDetails.appendChild(img);
        cardDetails.appendChild(name);
        card.addEventListener('click', (e) => {
          getPokemonDetail(e,pokemon.url);
        });
        card.appendChild(cardDetails);
        document.getElementById('pokemon').appendChild(card);
      });
    }).catch(error => console.log(error));
}
// funcion para mostrar los detalles de los pokemon extendiendo el card de la pagina principal
function getPokemonDetail(e,url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemon = data;
      const card = document.createElement('div');
      card.classList.add('card-more-details');
      const type = document.createElement('p');
      type.innerHTML = pokemon.types.map(type => type.type.name).join(', ');
      const height = document.createElement('p');
      height.innerHTML = `Height: ${pokemon.height}`;
      const weight = document.createElement('p');
      weight.innerHTML = `Weight: ${pokemon.weight}`;
      card.appendChild(type);
      card.appendChild(height);
      card.appendChild(weight);
      e.target.appendChild(card);
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
        const option = document.createElement('option');
        option.innerHTML = generation.name;
        document.getElementById('generations').appendChild(option);
      });
    }).catch(error => console.log(error));
}
//funcion mostrar lista de tipos de pokemon

getPokemon();
getGenerations();
function App() {
  return (
      <div className="App-header" >
        <span>Pokemons</span>
        <select id="generations">
         </select>
        <div className="cards" id='pokemon'>
        </div>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        
        </div>
  );
}

export default App;
