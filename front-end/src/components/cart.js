import React from "react";
import "./cart.css";

const Cart = ({ imgSrc, qNumber, title, totalQuestionsNumber }) => {

  return (
    <div className="cart">
      <div className = "imageContain">
        <img src={imgSrc} alt = ''/>
      </div>
      <div className="titleContainer">
        <h2 className="title">{title}</h2>
        <p className = "paragraph">Press the card to compare student's answer with correct answer. </p>
      </div>
    </div>
  );
};
export default Cart;
