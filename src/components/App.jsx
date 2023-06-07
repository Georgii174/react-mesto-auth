import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import ConfirmPopup from './ConfirmPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import * as auth from '../utils/Auth';
import ProtectedRoute from './ProtectedRoute'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [removeCardId, setRemoveCardId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [profileEmail, setProfileEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then(res => {
          if (res) {
            setIsLoggedIn(true)
            history.push('/')
            setProfileEmail(res.data.email)
          }
        })
        .catch((err) =>
          console.log(err));
    }
  })

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data)
        })
        .catch((err) =>
          console.log(err));

      api
        .getInitialCards()
        .then((res) => {
          setCards([...res]);
        })
        .catch((err) =>
          console.log(err));
    }
  }, [isLoggedIn])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardDeleteClick(cardId) {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setRemoveCardId(cardId);
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setSelectedCard(null)
    setIsInfoTooltipPopupOpen(false)
    setIsConfirmPopupOpen(false)
  }

  function handleCardLike(likes, _id) {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api
      .changeLikeStatus(_id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === _id ? newCard : c));
      })
      .catch((err) =>
        console.log(err));
  }

  function handleCardDelete(id) {
    setIsLoading(true);
    api
      .deleteCard(id)
      .then(() => setCards((state) => state.filter((item) => item._id !== id)),
        closeAllPopup())
      .catch((err) =>
        console.log(err))
      .finally(() => {
      setIsLoading(false);
    })
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) =>
        console.log(err))
      .finally(() => {
      setIsLoading(false)
    })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) =>
        console.log(err))
      .finally(() => {
      setIsLoading(false)
    })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) =>
        console.log(err))
      .finally(() => {
      setIsLoading(false);
    });
  }

  function handleAuthorize(email, password) {
    auth
    .authorize(email, password)
      .then(res => {
        if(res) {
          setIsLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          history.push('./');
        }
      })
      .catch(err => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      })

  }

  function handleRegister(email, password) {
    auth
    .register(email, password)
      .then(res => {
        if(res) {
          setIsSuccess(true);
          setIsInfoTooltipPopupOpen(true)
          history.push('./sign-in');
        }
      })
      .catch(err => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      })

  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          onSignOut={handleSignOut}
          userEmail={profileEmail} />

        <Switch>
          <Route path="/sign-up">
            <Login onAuthorize={handleAuthorize} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <ProtectedRoute
            path="/"
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
            cards={cards}
            loggedIn={isLoggedIn}
            component={Main}
          />
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopup}
          onSubmit={handleCardDelete}
          card={removeCardId}
          onLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopup}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopup}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
