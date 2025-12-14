import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext';

export default function EditProfile({onUpdateUser}) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState('');
const [description, setDescription] = useState('');

   useEffect(() => {
  if (currentUser) {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }
}, [currentUser]);

  const handleNameChange = (event) => {
  setName(event.target.value);
};

const handleDescriptionChange = (event) => {
  setDescription(event.target.value);
};

const handleSubmit = (event) => {
  event.preventDefault();
  handleUpdateUser({
    name: name,
    about: description,
  });
};

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
  type="text"
  className="popup__input"
  name="name"
  placeholder="Jacques Cousteau"
  required
  id="profile__name-input"
  minLength="2"
  maxLength="40"
  value={name}
  onChange={handleNameChange}
/>
      <span id="profile__name-input-error" className="popup__error"></span>
      <input
  type="text"
  className="popup__input"
  name="role"
  placeholder="Explorador"
  required
  id="profile__role-input"
  minLength="2"
  maxLength="200"
  value={description}
  onChange={handleDescriptionChange}
/>
      <span id="profile__role-input-error" className="popup__error"></span>
      <button type="submit" className="popup__button">Salvar</button>
    </form>
  );
}
