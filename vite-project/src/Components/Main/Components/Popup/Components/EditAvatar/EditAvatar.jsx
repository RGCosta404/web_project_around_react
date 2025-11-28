export default function EditAvatar() {
  return (
    <form className="popup__form" name="avatar-form">
      <input
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