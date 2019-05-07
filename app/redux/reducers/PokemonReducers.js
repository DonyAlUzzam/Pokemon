const initial = {
  pokemons: [],
  readmore: {},
  isLoading: false,
  length: 0,
  page: 1,
  lastid: 0,
  types: [],
  categories: [],
  mapsPokemon: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case "GET_ALL_POKEMONS_PENDING":
      return {
        ...state,
        isLoading: true
      };
    // case "GET_ALL_POKEMONS_FULFILLED":
    //   return {
    //     ...state,
    //     pokemons: action.payload.data.data,
    //     isLoading: false
    //   };
    case "GET_ALL_POKEMONS_FULFILLED":
    // alert(JSON.stringify(state.pokemons))
      Array.prototype.push.apply(state.pokemons, action.payload.data.data);
      //  alert(JSON.stringify(action.payload.data.data, null, 2));
      // let data = []
      // if(action.payload.data.data == 1){
      //   data = action.payload.data.data
      // } else {
      //   data = {...state.pokemons, ...action.payload.data.data}
      // }
      
      return {
        ...state,
        pokemons: state.pokemons,
        isLoading: false,
        page: action.payload.data.page
      };

    case "GET_POKEMON_DETAIL_FULFILLED":
      //   alert(action.payload.data[0])
      return {
        ...state,
        readmore: action.payload.data,
        isLoading: false
      };
    case "GET_POKEMON_DETAIL_PENDING":
      return {
        ...state,
        isLoading: true
      };

    case "GET_SEARCH_POKEMON_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_SEARCH_POKEMON_FULFILLED":
      return {
        ...state,
        pokemons: action.payload.data.data,
        isLoading: false
      };

    case "ADD_POKEMON_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "ADD_POKEMON_FULFILLED":
      // state.pokemons.push(action.payload.data.pokemons);
      // alert(JSON.stringify(action.payload.data.pokemons))
      return {
        ...state,
        // pokemons: state.pokemons,
        isLoading: false
      };
      case "DELETE_ITEM_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "DELETE_ITEM_FULFILLED":

            // console.log("POKEMON ID =>", idPokemon);

            // let deleted = state.pokemons.map((val, i) => {
            //     if (val.id !== parseInt(action.payload.data.id)) {
            //       console.log('====================================');
            //       console.log(idPokemon);
            //       console.log('====================================');
            //         return val
            //     }
            // })

            let deleted = state.pokemons.filter(val=>{
              return val.id !== parseInt(action.payload.data.id)
            })
            // alert(JSON.stringify(deleted, null, 2))


            return {
              ...state,
                pokemons: deleted
            }


    case "GET_MAPS_POKEMON_FULFILLED":
      return {
        ...state,
        mapsPokemon: action.payload.data.data
      };

    case "GET_MAPS_POKEMON_PENDING":
      return {
        ...state,
        isLoading: true
      };

    case "UPDATE_POKEMON_FULFILLED":
    // alert(JSON.stringify(action.payload.data.pokemon))
      var idPokemon = action.payload.data.pokemon.id
      let array = state.pokemons.map((val, i) => {
        if(val.id === idPokemon){
          return action.payload.data.pokemon
        } else {
          return val
        }
      })

      return{
        ...state,
        pokemons: array,
        isLoading: false
      }

      case "UPDATE_POKEMON_PENDING":
      return {
        ...state,
        isLoading: true
      };


    default:
      return state;
  }
};
