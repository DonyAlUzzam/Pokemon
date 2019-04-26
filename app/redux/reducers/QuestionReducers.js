const initial = {
  questions: [],
  readmore: {},
  answers:[],
  isLoading: false
};

export default (state = initial, action) => {
  switch (action.type) {
    case "GET_ALL_QUESTIONS_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_ALL_QUESTIONS_FULFILLED":
      console.log(action.payload.data);
      return {
        ...state,
        questions: action.payload.data,
      
        isLoading: false
      };

    case "GET_QUESTION_DETAIL_FULFILLED":
      return {
        ...state,
        readmore: action.payload.data[0],
        answer: action.payload.data[0].answer,
        isLoading: false
      };
    case "GET_QUESTION_DETAIL_PENDING":
      return {
        ...state,
        isLoading: true
      };

      case "POST_QUESTION_FULFILLED":
      return {
        ...state,
        questions: action.payload.data[0],
        isLoading: false
      };
    case "POST_QUESTION_PENDING":
      return {
        ...state,
        isLoading: true
      };

      case "POST_ANSWER_FULFILLED":
      return {
        ...state,
        answer: action.payload.data.answer,
        isLoading: false
      };
    case "POST_ANSWER_FULFILLED":
      return {
        ...state,
        isLoading: true
      };

      // POST_ANSWER:

      // return {
      //   ...state,
      //   readmore: {
      //     ...state.readmore,
      //     answer: [
      //       ...state.readmore.answer,
      //       ...a
      //     ]
      //   }
      // }
  

    default:
      return state;
  }
};
