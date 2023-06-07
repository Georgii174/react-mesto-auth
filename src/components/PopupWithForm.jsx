import React from 'react';
import ClosePopup from '../hook/ClosePopup';

function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit }) {

  const {handleCloseOnOverlay} = ClosePopup(isOpen, onClose)

  return (
    <>
      <div
      onMouseDown={handleCloseOnOverlay}
      className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button type="button" className="popup__close" onClick={onClose}></button>
          <h3 className="popup__title">{`${title}`}</h3>
          <form className="popup__form popup__form-profel" name={`popup-form-${name}`} onSubmit={onSubmit}>
            {children}
            <button className="popup__button-save" type="submit">{buttonText}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PopupWithForm
