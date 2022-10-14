import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './App.module.css';

function App() {
  const [enteredName, setEnteredName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const pokemonInfo = useSelector(state=>state.pokemon);

  const submitHandler = async (event)=>{
    event.preventDefault();
    setIsLoading(true);
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${enteredName}/`)
      const data = await response.json();
      var types = [];
      data.types.forEach(element => {
        types.push(element.type.name)
      });
      // setPokemonInfo({
      //   name: data.name.toUpperCase(),
      //   number: data.id,
      //   img: data.sprites.other.home.front_default,
      //   height: (data.height*0.1).toFixed(1),
      //   weight: (data.weight*0.1).toFixed(1),
      //   type: types.join(', ')
      // });
      setIsInvalid(false);
      setEnteredName('');
    }catch(_){
        setIsInvalid(true);}
    setIsLoading(false);
  }

  return (
    <div className={styles.mainContent}>
      <form 
        className={`${styles.searchBox} ${isInvalid?styles.invalid:''}`}
        onSubmit={submitHandler}>
        <input 
          placeholder="enter name of pokemon"
          value={enteredName}
          onChange={(event)=>{setEnteredName(event.target.value)}}/>
          <button>{isLoading?'LOADING':'SEARCH'}</button>

      </form>
      <div className={styles.pokemon}>
        <img src={pokemonInfo.img} alt={'img'}></img>
        <div className={styles.pokemonDetails}>
          <span className={styles.pokemonName}>{`${pokemonInfo.name} `}</span>
          <span className={styles.pokemonNumber}>{`#${pokemonInfo.number}`}</span>
          <div className={styles.pokemonStats}>
            <div>
              <span className={styles.statsLabel}>Type: </span>
              <span className={styles.statsValue}>{pokemonInfo.type}</span>
            </div>
            <div>
              <span className={styles.statsLabel}>Height: </span>
              <span className={styles.statsValue}>{pokemonInfo.height} m</span>
            </div>
            <div>
              <span className={styles.statsLabel}>Weight: </span>
              <span className={styles.statsValue}>{pokemonInfo.weight} kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
