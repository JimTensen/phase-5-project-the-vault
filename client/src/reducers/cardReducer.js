import { GET_CARDS, ADD_CARD, DELETE_CARD, UPDATE_CARD } from '../actions/types';

const initialState = {
  cards: [],
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
      };
    // case UPDATE_CARD:
    //   return {
    //     ...state,
    //     cards: state.cards.map((card) =>
    //       card.id === action.payload.id ? action.payload : card
    //     ),
    //   };
    default:
      return state;
  }
};

export default cardReducer;