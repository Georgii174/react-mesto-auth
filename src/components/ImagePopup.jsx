import React from 'react';
import ClosePopup from '../hook/ClosePopup';

function ImagePopup({card, isOpen, onClose}) {

  const {handleCloseOnOverlay} = ClosePopup(isOpen, onClose)

  return (
    <>
      <div
      onMouseDown={handleCloseOnOverlay}
      className={`popup popup_photo ${card ? 'popup_opened' : ''}`}>
        <div className="popup__images-wrapper">
          <button type="button" className="popup__close popup__close_images-card" onClick={onClose}></button>
          <img className="popup__images-cards" alt={card ? card.name : '#'} src={card ? card.link : '#'} />
          <p className="popup__name-cards">{card ? card.name : ''}</p>
        </div>
      </div>
    </>
  )
}

export default ImagePopup
