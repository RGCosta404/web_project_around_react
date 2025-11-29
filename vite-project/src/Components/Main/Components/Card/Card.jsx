export default function Card(props) {
  const { name, link, isLiked } = props.card;
  
  function handleLikeClick() {
    console.log("Like clicado!");
  }
  
  function handleDeleteClick() {
    console.log("Delete clicado!");
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
          onClick={handleLikeClick}
          aria-label="Like card" 
          type="button" 
          className="card__like-button" 
        />
      </div>
    </li>
  );
}