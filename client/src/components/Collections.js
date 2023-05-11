import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Collections({ user }) {
  const [collections, setCollections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  useEffect(() => {
    if (user) {
      fetch(`/collections?user_id=${user.id}`)
        .then((r) => r.json())
        .then((data) => setCollections(data));
    }
  }, [user]);

  function handleDeleteCollection(id) {
    fetch(`/collections/${id}`, { method: "DELETE" })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCollections(collections.filter((c) => c.id !== id));
        }
      });
  }

  function handleCreateCollection() {
    fetch("/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCollectionName,
        user_id: user.id,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          const newCollection = {
            id: data.id,
            name: data.name,
          };
          setCollections([...collections, newCollection]);
          setShowModal(false);
          setNewCollectionName("");
        }
      });
  }

  return (
    <div>
      <h1>Collections</h1>
      {user ? (
        <>
          <button onClick={() => setShowModal(true)}>
            Create a Collection
          </button>
          {collections.length > 0 ? (
            collections.map((collection) => (
              <div key={collection.id}>
                <Link to={`/collection/${collection.id}`}>
                  {collection.name}
                </Link>
                <button onClick={() => handleDeleteCollection(collection.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>You have no collections.</p>
          )}
        </>
      ) : (
        <p>Please log in to view collections.</p>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Collection</h2>
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            <button onClick={handleCreateCollection}>Create</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collections;