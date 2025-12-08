import avatarImage from '../../images/avatar.jpg';
import editButtonImage from '../../images/editButton.png';
import { useState, useEffect } from "react";
import api from '../../Utils/Api';
import Card from './Components/Card/Card.jsx';
import NewCard from './Components/Popup/Components/NewCard/NewCard.jsx';
import EditProfile from './Components/Popup/Components/EditProfile/EditProfile.jsx';
import EditAvatar from './Components/Popup/Components/EditAvatar/EditAvatar.jsx';
import Popup from './Components/Popup/Popup.jsx';
import ImagePopup from './Components/Popup/Components/ImagePopup/ImagePopup.jsx';

export default function Main() {
    const [cards, setCards] = useState([]);
    const [popup, setPopup] = useState(null);
    const [currentUser, setCurrentUser] = useState({});

    const newCardPopup = { title: "New card", children: <NewCard /> };
    const editProfilePopup = { title: "Edit profile", children: <EditProfile /> };
    const editAvatarPopup = { 
  title: "Alterar a foto do perfil", 
  children: <EditAvatar /> 
};

useEffect(() => {
    Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
    ])
    .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
    })
    .catch((error) => console.error(error));
}, []);

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
        <section className="contentprofile">
          <div className="contentprofile-avatar-container">
            <img
  src={currentUser.avatar || avatarImage}
  alt={`foto de ${currentUser.name || 'usuário'}`}
  className="contentprofile-avatar"
/>
            <div className="contentprofile-avatar-overlay">
              <img
                src={editButtonImage}
                alt="Editar"
                className="contentprofile-avatar-edit"
                onClick={() => handleOpenPopup(editAvatarPopup)}
              />
            </div>
          </div>
          <div className="profile">
            <h1 className="profilename">{currentUser.name || 'Carregando...'}</h1>
            <button
              className ="profileedit"
              aria-label="Editar perfil"
              type="button"
              onClick={() => setPopup(editProfilePopup)}
            ></button>
            <h2 className="profilerole">{currentUser.about || 'Carregando...'}</h2>
          </div>
          <button
            className="contentadd"
            aria-label="Adicionar cards"
            type="button"
            onClick={() => setPopup(newCardPopup)}
          ></button>
        </section>
        <section className="cards">
            <ul className="elementslist">
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
