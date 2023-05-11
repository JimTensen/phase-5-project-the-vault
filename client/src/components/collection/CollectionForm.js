import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCollection } from '../../actions/collectionActions';

function CollectionForm() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCollection(name));
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter collection name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Collection</button>
    </form>
  );
};

export default CollectionForm;