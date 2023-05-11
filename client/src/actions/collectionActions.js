import { GET_COLLECTIONS, ADD_COLLECTION, DELETE_COLLECTION, } from './types';

export const getCollections = () => (dispatch) => {
  fetch('http://localhost:5555/collections')
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: GET_COLLECTIONS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log('Error fetching collections:', error);
    });
};

export const addCollection = (collectionData) => (dispatch) => {
  fetch('http://localhost:5555/collections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(collectionData),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: ADD_COLLECTION,
        payload: data,
      });
    })
    .catch((error) => {
      console.log('Error adding collection:', error);
    });
};

export const deleteCollection = (id) => (dispatch) => {
  fetch(`http://localhost:5555/collections/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      dispatch({
        type: DELETE_COLLECTION,
        payload: id,
      });
    })
    .catch((error) => {
      console.log('Error deleting collection:', error);
    });
};

// export const updateCollection = (id, collectionData) => (dispatch) => {
//   fetch(`http://localhost:5555/collections/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(collectionData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       dispatch({
//         type: UPDATE_COLLECTION,
//         payload: data,
//       });
//     })
//     .catch((error) => {
//       console.log('Error updating collection:', error);
//     });
// };