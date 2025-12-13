import vectorImage from "../../images/vector.png";
import lineImage from "../../images/line.png";

export default function Header() {
  return (
    <header className="header">
      <img
        src={vectorImage}
        alt="logo do header"
        className="header__vector"
      />
      <img 
        src={lineImage} 
        alt="linha do header" 
        className="header__line" 
      />
    </header>
  );
}