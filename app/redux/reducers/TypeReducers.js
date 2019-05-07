const initialState = {
    type: [],
    isLoading: false,
    length: 0
  }
  
  export default type = (state = initialState, action) => {
    switch (action.type) {
  
      case 'GET_ALL_TYPES_PENDING':
        return {...state, isLoading: true}
      case 'GET_ALL_TYPES_FULFILLED':
      // alert(JSON.stringify(action.payload.data))
        return { ...state,
           isLoading: false,
           type: action.payload.data,
           length: action.payload.data.length}
  
      default:
        return state;
  
    }
  }
