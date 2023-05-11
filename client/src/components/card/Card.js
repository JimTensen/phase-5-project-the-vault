import React from 'react';

function Card({ card }) {
  return (
    <div>
      <h2>{card.athlete}</h2>
      <p>Year: {card.year}</p>
      <p>Set: {card.set}</p>
      <p>Extra Info: {card.extra_info}</p>
      <p>Card Number: {card.card_num}</p>
      <p>Card Grade: {card.card_grade}</p>
      <p>Certification Number: {card.cert_num}</p>
      <img src={card.image} alt="Card" />
    </div>
  );
};

export default Card;