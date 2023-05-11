import { GET_COLLECTIONS, ADD_COLLECTION, DELETE_COLLECTION } from '../actions/types';

const initialState = {
  collections: []
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      };
    case ADD_COLLECTION:
      return {
        ...state,
        collections: [...state.collections, action.payload]
      };
    case DELETE_COLLECTION:
      return {
        ...state,
        collections: state.collections.filter(collection => collection.id !== action.payload)
      };
    default:
      return state;
  }
};

export default collectionReducer;