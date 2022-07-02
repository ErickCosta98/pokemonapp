// import logo from './logo.svg';
import './App.css';

// Funcion para agregar una tarea
// function addTask(e) {
//   e.preventDefault();
//   const task = document.getElementById('task').value;
//   const list = document.getElementById('list');
//   const li = document.createElement('li');
//   // Agregar evento para borrar la tarea
//   li.addEventListener('click', deleteTask);
//   li.innerHTML = task;
//   list.appendChild(li);
// }

// Funcion para borrar una tarea seleccionada
// function deleteTask(e) {
//   e.target.remove();
// }

//funcion para mostrar los pokemon en las tarjetas de la pagina principal desde la pokeapi
function getPokemon() {
  const url = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemons = data.results;
      pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;
        const name = document.createElement('h2');
        name.innerHTML = pokemon.name;
        card.appendChild(img);
        card.appendChild(name);
        document.getElementById('pokemon').appendChild(card);
      });
    }).catch(error => console.log(error));
}

getPokemon()

function App() {
  return (
    <div className="App" >
        {/* <h2>Pokemons</h2> */}
      <div className="App-header" id='pokemon'>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        
        </div>
    </div>
  );
}

export default App;
