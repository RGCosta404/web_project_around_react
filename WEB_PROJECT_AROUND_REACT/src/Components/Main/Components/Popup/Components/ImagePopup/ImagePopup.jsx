export default function ImagePopup(props) {
  const {card } = props;
  
  return (
    <div>
      <img src={card.link} alt={card.name} className="popup__image" />
      <p className="popup__image-caption">{card.name}</p>
    </div>
  );
}