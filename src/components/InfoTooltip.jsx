import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="popup__success-images" src={`${isSuccess ? success : fail}`} alt="" />
        <h2 className="popup__success-title">{`${isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip

