import React from "react";
import classnames from "classnames";
import pokeball from "../images/apple.png";
import "./Card.css";

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("Card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
      <div className="Card-face Card-font-face">
        <img src={pokeball} alt="pokeball" />
      </div>
      <div className="Card-face Card-back-face">
        <img src={card.image} alt="pokeball" />
      </div>
    </div>
  );
};

export default Card;
