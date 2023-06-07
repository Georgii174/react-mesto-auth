import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profail">
        <div className="profail__avatar">
          <img src={currentUser.avatar} className="profail__avatar-images" alt="аватарка" />
          <button type="button" className="profail__avatar-button" onClick={onEditAvatar}></button>
        </div>
        <div className="profail__blok">
          <h1 className="profail__name">{currentUser.name}</h1>
          <button type="button" className="profail__edit-button" onClick={onEditProfile}></button>
          <p className="profail__text">{currentUser.about}</p>
        </div>
        <button type="button" className="profail__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="group">
        {cards.map((card) => (
          <Card
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            key={card._id}
            {...card}
          />
        ))}
      </section>
    </main>
  )
}


export default Main
