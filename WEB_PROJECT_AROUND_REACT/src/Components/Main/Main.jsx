import avatarImage from '../../images/avatar.jpg';
import editButtonImage from '../../images/editButton.png';
import { useState } from "react";
import Card from './Components/Card/Card.jsx';
import NewCard from './Components/Popup/Components/NewCard/NewCard.jsx';
import EditProfile from './Components/Popup/Components/EditProfile/EditProfile.jsx';
import EditAvatar from './Components/Popup/Components/EditAvatar/EditAvatar.jsx';
import Popup from './Components/Popup/Popup.jsx';
import ImagePopup from './Components/Popup/Components/ImagePopup/ImagePopup.jsx';

const initialCards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];

export default function Main() {
    const [cards, setCards] = useState(initialCards);
    const [popup, setPopup] = useState(null);
    

    const newCardPopup = { title: "New card", children: <NewCard /> };
    const editProfilePopup = { title: "Edit profile", children: <EditProfile /> };
    const editAvatarPopup = { 
  title: "Alterar a foto do perfil", 
  children: <EditAvatar /> 
};

    function handleOpenPopup(popup) {
    setPopup(popup);
  }
 
  function handleClosePopup() {
    setPopup(null);
  }

  function handleCardClick(cardData) {
  const imagePopupWithData = { 
    title: null, 
    children: <ImagePopup src={cardData.link} alt={cardData.name} /> 
  };
  setPopup(imagePopupWithData);
  }
  
  function handleLike(cardId) {
  setCards(cards.map(card => 
    card._id === cardId 
      ? { ...card, isLiked: !card.isLiked }
      : card
  ));
}

function handleDelete(cardId) {
  setCards(cards.filter(card => card._id !== cardId));
}

    return (
    <main className="content">
        <section className="content__profile">
          <div className="content__profile-avatar-container">
            <img
  src={avatarImage}
  alt="foto de Jacques Cousteau"
  className="content__profile-avatar"
/>
            <div className="content__profile-avatar-overlay">
              <img
                src={editButtonImage}
                alt="Editar"
                className="content__profile-avatar-edit"
                onClick={() => handleOpenPopup(editAvatarPopup)}
              />
            </div>
          </div>
          <div className="profile">
            <h1 className="profile__name">Jacques Cousteau</h1>
            <button
              className ="profile__edit"
              aria-label="Editar perfil"
              type="button"
              onClick={() => setPopup(editProfilePopup)}
            ></button>
            <h2 className="profile__role">Esplorador</h2>
          </div>
          <button
            className="content__add"
            aria-label="Adicionar cards"
            type="button"
            onClick={() => setPopup(newCardPopup)}
          ></button>
        </section>
        <section className="cards">
            <ul className="elements__list">
                {cards.map((card) => (
                    <Card 
                    key={card._id} 
                    card={card} 
                    onCardClick={handleCardClick}
                    onLike={handleLike}
                    onDelete={handleDelete}
                    />
                ))}
            </ul>
        </section>
    {popup && (
    <Popup 
        onClose={handleClosePopup}
        title={popup.title}>
      {popup.children}
    </Popup>
  )}
      </main>
  );
}
