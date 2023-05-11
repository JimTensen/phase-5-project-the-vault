import React, { useState } from 'react';

function CardForm() {
  const [athlete, setAthlete] = useState('');
  const [year, setYear] = useState(0);
  const [set, setSet] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardGrade, setCardGrade] = useState(0);
  const [certNum, setCertNum] = useState(0);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      athlete,
      year,
      set,
      extra_info: extraInfo,
      card_num: cardNum,
      card_grade: cardGrade,
      cert_num: certNum,
      image: URL.createObjectURL(image),
    };
    setAthlete('');
    setYear(0);
    setSet('');
    setExtraInfo('');
    setCardNum('');
    setCardGrade(0);
    setCertNum(0);
    setImage(null);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Athlete"
        value={athlete}
        onChange={(e) => setAthlete(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value))}
      />
      <input
        type="text"
        placeholder="Set"
        value={set}
        onChange={(e) => setSet(e.target.value)}
      />
      <textarea
        placeholder="Extra Info"
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Card Number"
        value={cardNum}
        onChange={(e) => setCardNum(e.target.value)}
      />
      <input
        type="number"
        placeholder="Card Grade"
        value={cardGrade}
        onChange={(e) => setCardGrade(parseInt(e.target.value))}
      />
      <input
        type="number"
        placeholder="Certification Number"
        value={certNum}
        onChange={(e) => setCertNum(parseInt(e.target.value))}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Create Card</button>
    </form>
  );
};

export default CardForm;