import React, { useState, useEffect } from "react";

function CollectionDetails({ match, user }) {
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    fetch(`/collections/${match.params.id}`)
      .then((r) => r.json())
      .then((data) => setCollection(data));
  }, [match.params.id]);

  if (!collection) {
    return <p>Loading collection...</p>;
  }

  function handleDeleteCard(id) {
    fetch(`/cards/${id}`, { method: "DELETE" })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCollection((prevCollection) => ({
            ...prevCollection,
            cards: prevCollection.cards.filter((card) => card.id !== id),
          }));
        }
      });
  }

  return (
    <div>
      <h1>{collection.name}</h1>
      {collection.cards.map((card) => (
        <div key={card.id}>
          <h2>{card.athlete}</h2>
          <img
            src={card.image_front}
            alt={card.athlete}
            onClick={() => {
              // Handle card image flip
            }}
          />
          <img
            src={card.image_back}
            alt={card.athlete}
            onClick={() => {
              // Handle card image flip
            }}
          />
          {/* Display card information */}
          <p>Year: {card.year}</p>
          <p>Set: {card.set}</p>
          {/* Add more card information */}
          {user && (
            <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CollectionDetails;