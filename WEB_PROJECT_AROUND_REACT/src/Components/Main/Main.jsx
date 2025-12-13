import { useState, useEffect } from "react";
import {api} from '../../Utils/Api';
import Card from './Components/Card/Card.jsx';
import NewCard from './Components/Popup/Components/NewCard/NewCard.jsx';
import EditProfile from './Components/Popup/Components/EditProfile/EditProfile.jsx';
import EditAvatar from './Components/Popup/Components/EditAvatar/EditAvatar.jsx';
import Popup from './Components/Popup/Popup.jsx';
import ImagePopup from './Components/Popup/Components/ImagePopup/ImagePopup.jsx';
import { useContext } from 'react';
import {CurrentUserContext} from '../../Contexts/CurrentUserContext';

export default function Main({
  cards, onCardLike, onCardDelete, popup, onOpenPopup, onClosePopup, onAddPlaceSubmit
  }) {
   const { currentUser} = useContext(CurrentUserContext);
   const [selectedCard, setSelectedCard] = useState(null);

    const newCardPopup = { title: "New card", children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} onClose={onClosePopup} /> };
    const editProfilePopup = { title: "Edit profile", children: <EditProfile on onClose={onClosePopup} /> };
    const editAvatarPopup = { 
  title: "Alterar a foto do perfil", 
  children: <EditAvatar /> 
};

    function handleOpenImagePopup(card) {
      setSelectedCard(card);
      const imagePopupObject = {
        title: '',
        children: <ImagePopup card={card} />,
      };
      onOpenPopup(imagePopupObject);
    }

    return (
    <main className="content">
        <section className="content__profile">
          <div className="content__profile-avatar-container">
            <img
  src={currentUser.avatar}
  alt={`foto de ${currentUser.name || 'usuário'}`}
  className="content__profile-avatar"
/>
            <div className="content__profile-avatar-overlay">
              <img
                alt="Editar"
                className="content__profile-avatar-edit"
                type="button"
                  onClick={() => onOpenPopup(editAvatarPopup)}
              />
            </div>
          </div>
          <div className="profile">
            <h1 className="profile__name">{currentUser.name || 'Carregando...'}</h1>
            <button
              className ="profile__edit"
              aria-label="Editar perfil"
              type="button"
              onClick={() => onOpenPopup(editProfilePopup)}
            ></button>
            <h2 className="profile__role">{currentUser.about || 'Carregando...'}</h2>
          </div>
          <button
            className="content__add"
            aria-label="Adicionar cards"
            type="button"
            onClick={() => onOpenPopup(newCardPopup)}
          ></button>
        </section>
        <section className="cards">
                {cards.map((card) => (
                    <Card 
                    key={card._id} 
                    card={card} 
                    onImageClick={handleOpenImagePopup}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                    />
                ))}
        </section>
    {popup && (
    <Popup onClose={onClosePopup} title={popup.title}>
      {popup.children}
    </Popup>
  )}
      </main>
  );
}
