export default function Card(props) {
  const { name, link, isLiked, _id } = props.card;
  const { onLike, onDelete } = props;
  
  function handleLikeClick() {
    onLike(_id);
  }

  function handleDeleteClick() {
    onDelete(_id);
  }

  return (
    <li className="card">
      <img className="card__image" src={link} alt={name} />
      <button 
        onClick={handleDeleteClick}
        aria-label="Delete card" 
        className="card__delete-button" 
        type="button" 
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          className={`card__like-button ${isLiked ? 'card__like-active' : ''}`}
          type="button"
          onClick={handleLikeClick} 
        />
      </div>
    </li>
  );
}