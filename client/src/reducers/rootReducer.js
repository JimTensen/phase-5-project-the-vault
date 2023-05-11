import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cardReducer from './cardReducer';
import collectionReducer from './collectionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  card: cardReducer,
  collection: collectionReducer,
});

export default rootReducer;