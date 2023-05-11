import { GET_CARDS, ADD_CARD, DELETE_CARD, UPDATE_CARD } from './types';


export const getCards = () => (dispatch) => {
  fetch('http://localhost:5555/cards')
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: GET_CARDS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log('Error fetching cards:', error);
    });
};

export const addCard = (cardData) => (dispatch) => {
  fetch('http://localhost:5555/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardData),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: ADD_CARD,
        payload: data,
      });
    })
    .catch((error) => {
      console.log('Error adding card:', error);
    });
};

export const deleteCard = (id) => (dispatch) => {
  fetch(`http://localhost:5555/cards/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      dispatch({
        type: DELETE_CARD,
        payload: id,
      });
    })
    .catch((error) => {
      console.log('Error deleting card:', error);
    });
};

export const updateCard = (id, cardData) => (dispatch) => {
  fetch(`http://localhost:5555/cards/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardData),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: UPDATE_CARD,
        payload: data,
      });
    })
    .catch((error) => {
      console.log('Error updating card:', error);
    });
};