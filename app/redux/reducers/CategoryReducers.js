const initialState = {
  categories: [],
  isLoading: false,
  length: 0,
  lastid: 0
};

export default categories = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_CATEGORIES_PENDING":
    return { ...state, isLoading: true };
  case "ALL_CATEGORIES_FULFILLED":
  // alert(JSON.stringify(action.payload.data))
    return {
      ...state,
      categories: action.payload.data,
      isLoading: false
    };
    default:
      return state;
  }
};
