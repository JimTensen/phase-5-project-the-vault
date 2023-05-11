import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../actions/cardActions';

function CardItem({ card }) {
  const dispatch = useDispatch();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDelete = () => {
    dispatch(deleteCard(card.id));
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-wrapper">
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="card-inner">
          <div className="card-front">
            <img src={card.frontImage} alt="Front" />
          </div>
          <div className="card-back">
            <img src={card.backImage} alt="Back" />
          </div>
        </div>
        <div className="card-info">
          <h2 className="card-title">{card.athlete}</h2>
          <p>Year: {card.year}</p>
          <p>Set: {card.set}</p>
          <p>Extra Info: {card.extra_info}</p>
          <p>Card Number: {card.card_num}</p>
          <p>Card Grade: {card.card_grade}</p>
          <p>Certification Number: {card.cert_num}</p>
        </div>
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default CardItem;