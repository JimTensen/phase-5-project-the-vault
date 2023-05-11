import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/authReducer'
import collectionReducer from '../reducers/collectionReducer'
import cardReducer from '../reducers/cardReducer'

export default configureStore({
  reducer: {
    user: userReducer,
    collection: collectionReducer,
    card: cardReducer
  }
})