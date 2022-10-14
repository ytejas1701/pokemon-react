import { createSlice, configureStore } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({    
        name:'pokemon',
        initialState:{
            name: 'BULBASAUR',
            number: 1,
            height: 0.7,
            weight: 6.9,
            type: ['grass, poison '],
            img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
          },
        reducers:{
            changePokemon:state=>{

            }
        }
});

const store = configureStore({
    reducer: {pokemon: pokemonSlice.reducer}
});

export const pokemonActions = pokemonSlice.actions;
export default store;