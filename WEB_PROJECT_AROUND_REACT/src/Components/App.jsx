import Header from './Header/Header.jsx';
import '../index.css'
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useState, useEffect, useCallback } from 'react';
import {api} from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
  api.getUserInfo()
    .then((userData) => {
      setCurrentUser(userData);
    })
    .catch((err) => { console.log(err); });
}, []);

useEffect(() => {
  api.getInitialCards()
    .then((cardsData) => {
      setCards(cardsData);
    })
    .catch((err) => {console.log(err);});
}, []);

function handleOpenPopup(popup) {
  setPopup(popup);
}

function handleClosePopup() {
  setPopup(null);
}

const handleUpdateUser = useCallback(async (data) => {
  console.log('handleUpdateUser chamado com:', data);
  try {
    const newData = await api.setUserInfo(data);
    console.log('Resposta da API:', newData);
    setCurrentUser(newData);
    handleClosePopup();
  } catch (err) {
    console.log(err);
  }
}, []);

const handleUpdateAvatar = useCallback(async (data) => {
  try {
    const newData = await api.setUserAvatar(data);
    setCurrentUser(newData);
    handleClosePopup();
  } catch (err) {
    console.log(err);
  }
}, []);

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    try {
      let newCard;
      if (isLiked) {
        newCard = await api.unlikeCard(card._id);
      } else {
        newCard = await api.likeCard(card._id);
      }
      setCards((state) => cards.map((c) => (c._id === card._id ? newCard : c)));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCardDelete(card) {
   if(card.owner !== currentUser._id) {
      console.log('Você não pode deletar este cartão.');
      return;
    }

    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddPlaceSubmit(cardData) {
    try {
      const newCard = await api.addCard(cardData);
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch (err) {
      console.log(err);
    }
  }

  return (
  <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
    <div className="page">
      <Header />
      <Main 
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onAddPlaceSubmit={handleAddPlaceSubmit}
        popup={popup}
        onOpenPopup={handleOpenPopup}
        onClosePopup={handleClosePopup}
      />
      <Footer />
    </div>
  </CurrentUserContext.Provider>
);
}

export default App
