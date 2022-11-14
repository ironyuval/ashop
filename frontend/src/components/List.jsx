import { useEffect, useState } from "react";

export const defaultCardsAmount = 5;

const cardsGenerate = (numOfCards) => {
  const cards = [];

  for (let i = 0; i < numOfCards; ++i) {
    cards.push({
      id: `${i}`,
      title: "abc",
      imageUrl: "https://picsum.photos/200/300",
    });
  }

  return cards;
};

function List() {
  const [cards, setCards] = useState(cardsGenerate(defaultCardsAmount));

  return (
    <div
      style={{
        border: "1px solid green",
        width: "100%",
        display: "flex",
        flex: 0.5,
      }}
    >
      {cards.map((card, index) => (
        <div
          key={card.id}
          style={{
            width: "20%",
            margin: "0px 10px 0px 10px",
            border: "1px solid blue",
            backgroundImage: `url(${card.imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
      ))}
    </div>
  );
}

export default List;
