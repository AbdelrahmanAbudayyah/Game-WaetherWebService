import React from "react";
import { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";


import Card from "./Card";
import "./Game.css";

const uniqueCardsArray = [
  {
    type: "painting1",
    image: require(`../images/painting1.jpg`)
  },
  {
    type: "painting2",
    image: require(`../images/painting2.jpg`)
  },
  {
    type: "painting3",
    image: require(`../images/painting3.jpg`)
  },
  {
    type: "painting4",
    image: require(`../images/painting4.jpg`)
  },
  {
    type: "painting5",
    image: require(`../images/painting5.jpg`)
  },
  {
    type: "painting6",
    image: require(`../images/painting6.jpg`)
  }
];

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function Game(){

  const [cards, setCards] = useState(() =>
    shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
     alert("You won");
     handleRestart();
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  };

    return(
        <>

          <div className="tab-pane fade show active" id="game-tab-pane" role="tabpanel" aria-labelledby="game-tab">
            <br></br>
            <div className="Game">
      <header>
        <h3>Flip card game</h3>
        <div>
          Select two cards with same picture to make them disappear
        </div>
      </header>
      <div className="container">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
      <footer>
        <div className="restart">
          <Button onClick={handleRestart}  >
            Restart Game
          </Button>
        </div>
      </footer>
    </div>
    </div>
                   
            
     </>
       

        
    );

}
export default Game;

