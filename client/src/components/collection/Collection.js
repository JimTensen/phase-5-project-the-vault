import React from 'react';
import { useSelector } from 'react-redux';
import CollectionItem from './CollectionItem';
import CollectionForm from './CollectionForm';

function Collection() {
  const collections = useSelector((state) => state.collection.collections);

  return (
    <div>
      <h1>My Collections</h1>
      <CollectionForm />
      <div>
        {collections.map((collection) => (
          <CollectionItem key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default Collection;