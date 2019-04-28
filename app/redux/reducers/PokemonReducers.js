const initial = {
    pokemons: [],
    readmore: {},
    isLoading: false
  };
  
  export default (state = initial, action) => {
    switch (action.type) {
      case "GET_ALL_POKEMONS_PENDING":
        return {
          ...state,
          isLoading: true
        };
      case "GET_ALL_POKEMONS_FULFILLED":
    //    alert(action.payload.data);
        return {
          ...state,
          pokemons: action.payload.data,
          isLoading: false
        };
  
      case "GET_POKEMON_DETAIL_FULFILLED":
    //   alert(action.payload.data[0])
        return {
          ...state,
          readmore: action.payload.data[0],
          isLoading: false
        };
      case "GET_POKEMON_DETAIL_PENDING":
        return {
          ...state,
          isLoading: true
        };
  
  
      default:
        return state;
    }
  };
  