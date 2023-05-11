import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCollection } from '../actions/collectionActions';
import { useHistory } from 'react-router-dom';

function CollectionItem({ collection }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    dispatch(deleteCollection(collection.id));
  };

  const handleCollectionClick = () => {
    history.push(`/collections/${collection.id}`);
  };

  return (
    <div>
      <h2 onClick={handleCollectionClick}>{collection.name}</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CollectionItem;