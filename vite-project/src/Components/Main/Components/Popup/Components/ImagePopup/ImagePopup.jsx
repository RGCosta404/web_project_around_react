export default function ImagePopup(props) {
  const { src, alt } = props;
  
  return (
    <img src={src} alt={alt} className="popup__image" />
  );
}