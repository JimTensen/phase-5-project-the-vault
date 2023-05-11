import React from 'react';
import CollectionItem from './CollectionItem';
import { useSelector } from 'react-redux';

function CollectionList() {
  const collections = useSelector((state) => state.collection.collections);

  return (
    <div>
      {collections.map((collection) => (
        <CollectionItem key={collection.id} collection={collection} />
      ))}
    </div>
  );
};

export default CollectionList;
