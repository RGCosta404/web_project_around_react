export default function NewCard() {
  return (
    <form className="popup__form" name="add-card-form">
      <input
        type="text"
        className="popup__input"
        name="place"
        placeholder="Nome"
        required
        id="place-input"
        minLength="1"
        maxLength="30"
      />
      <span id="place-input-error" className="popup__error"></span>
      <input
        type="url"
        className="popup__input"
        name="link"
        placeholder="Link da imagem"
        required
        id="link-input"
        minLength="1"
        maxLength="200"
      />
      <span id="link-input-error" className="popup__error"></span>
      <button type="submit" className="popup__button">Criar</button>
    </form>
  );
}