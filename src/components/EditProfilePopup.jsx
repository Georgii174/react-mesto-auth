import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Validation from "../hook/Validation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const { enteredValue, error, isValid, handleChange, resetForm } = Validation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: enteredValue.name,
      about: enteredValue.about,
    });
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профель'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
      onLoading={onLoading}
      isDisabled={!isValid}>

      <input type="text" className={error.name ? "popup__input popup__input_name_block" : "popup__input"}
        id="name-input" name="name"
        placeholder="Имя" minLength="2" maxLength="40" required
        onChange={handleChange}
        value={enteredValue.name || ''} />
      <span className="popup__error popup__error_visible name-input-error">{error.name}</span>

      <input type="text" className={error.about ? "popup__input popup__input_text_block" : "popup__input"}
        id="job-input" name="about"
        placeholder="Вид деятельности" minLength="2" maxLength="200" required
        onChange={handleChange}
        value={enteredValue.about || ''} />
      <span className="popup__error popup__error_visible job-input-error">{error.about}</span>

    </PopupWithForm>
  )
}

export default EditProfilePopup
