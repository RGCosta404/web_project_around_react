import { useRef, useContext } from 'react';
import {CurrentUserContext} from '../../../../../../Contexts/CurrentUserContext';

export default function EditAvatar() {
  const avatarRef = useRef(); 
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    
    handleUpdateAvatar(
      avatarRef.current.value,);
  }

  return (
    <form className="popup__form" name="avatar-form" onSubmit={handleSubmit}>
      <input
        ref={avatarRef}
        type="url"
        className="popup__input"
        name="avatar"
        placeholder="Link da imagem"
        required
        id="avatar-input"
        minLength="1"
        maxLength="200"
      />
      <span id="avatar-input-error" className="popup__error"></span>
      <button type="submit" className="popup__button">Salvar</button>
    </form>
  );
}