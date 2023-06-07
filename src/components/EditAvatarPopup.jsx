import { createRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Validation from "../hook/Validation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const { enteredValue, error, isValid, handleChange, resetForm } = Validation();
  const avatar = createRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });

  }

  useEffect(() => {
    resetForm()
    // avatar.current.value = '';
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Обновить'}
      onLoading={onLoading}
      isDisabled={!isValid}>

      <input type="url" className={error.avatar ? "popup__input popup__input_link_avatar" : "popup__input"}
        id="avatar-input" name="avatar"
        placeholder="Ссылка на аватарку" required
        value={enteredValue.avatar || ''} onChange={handleChange} />
      <span className="popup__error popup__error_visible avatar-input-error">{error.avatar}</span>

    </PopupWithForm>
  )
}

export default EditAvatarPopup

