export default function EditProfile() {
  return (
    <form className="popup__form">
      <input
        type="text"
        className="popup__input"
        name="name"
        placeholder="Jacques Cousteau"
        required
        id="profile__name-input"
        minLength="2"
        maxLength="40"
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
      />
      <span id="profile__role-input-error" className="popup__error"></span>
      <button type="submit" className="popup__button">Salvar</button>
    </form>
  );
}