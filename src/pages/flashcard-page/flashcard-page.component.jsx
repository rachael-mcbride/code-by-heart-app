import React from 'react';
import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import NonrunnableCodeEditor from '../../components/nonrunnable-code-editor/nonrunnable-code-editor.component.jsx'
import RunnableCodeEditor from '../../components/runnable-code-editor/runnable-code-editor.component.jsx'
// import CustomButton from '../../custom-button/custom-button.component.jsx'
import DecksList from '../../components/decks-list/decks-list.component.jsx'
import NewDeck from '../../components/new-deck/new-deck.component.jsx'
import FlashcardsContainer from '../../components/flashcards-container/flashcards-container.component.jsx'


import axios from "axios";
import './flashcard-page.styles.scss'

const FlashcardPage = ( {currentUser} ) => {
  // FLASHCARDS BEING REVIEWED 
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  // DECKS // DECKS // DECKS // DECKS // DECKS // DECKS // DECKS // DECKS
  const [decksData, setDecksData] = useState([])
  const [currentDeck, setCurrentDeck] = useState({
    id: null,
    owner_id: "",
    name: "",
  });

  // NEW FLASHCARDS BEING ADDED 
  // const [newFlashcardFront, setNewFlashcardFront] = useState("");
  // const [newFlashcardBack, setNewFlashcardBack] = useState("");
  // // prevents user from adding a flashcard with an empty front or back
  // const newFlashcardIsEnabled = newFlashcardFront.length > 0 && newFlashcardBack.length > 0;

  useEffect(() => {
    const loadDecks = () => {
      const userData = {
          uid: currentUser.id,
          displayName: currentUser.displayName,
          email: currentUser.email
      }
      axios
      .post("http://127.0.0.1:5000/load_decks", userData)
      .then((response) => {
          setDecksData(response.data);
      })
      .catch((error) => {
          console.log("there was an error", error);
      });
    }
    loadDecks();
  }, []); // shouldn't loadDecks only run once at the beginning of a user signing in?

  // without the useEffect() call under this one, it's always delayed by 1! 
  const updateCurrentDeck = (selectedDeck) => {
    setCurrentDeck(selectedDeck);
    console.log("current deck was updated!")
    console.log("Current deck is:", currentDeck);
  };

  useEffect(() => {
    updateCurrentDeck(currentDeck)
    console.log("flashcards data:", flashcardsData)
  }, [currentDeck, flashcardsData]); // if I follow advice, makes infinite loop!

  const createNewDeck = (newDeck) => {
      const newDeckData = {
        deck_name: newDeck["name"]
      }
    axios
    .post(`http://127.0.0.1:5000/decks/${currentUser.id}`, newDeckData)
    .then((response) => {
      console.log("response:", response.data);
      const decks = [...decksData];
      decks.push(response.data);
      setDecksData(decks);
    })
    .catch((error) => {
      console.log("error:", error)
    });
  };
  

  const deleteDeck = () => {
    axios
      .delete(`http://127.0.0.1:5000/decks/${currentDeck.id}`)
      .then((response) => {
        console.log(response);
        const updatedDecksData = decksData.filter(
          (deck) => deck.id !== currentDeck.id
        );
        setCurrentDeck({
          id: null,
          owner_id: "",
          name: "",
        })
        setDecksData(updatedDecksData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // CARDS // CARDS  // CARDS  // CARDS  // CARDS  // CARDS  // CARDS 

  useEffect(() => {
    if (currentDeck.id === null) {
      console.log('User has signed in, but no deck has been selected yet.');
      return;
    }
    axios
      .get(
        `http://127.0.0.1:5000/decks/${currentDeck.id}/flashcards`
      )
      .then((response) => {
        setFlashcardsData(response.data);
        if (response.data.length > 0) {
          setCurrentCard(response.data[0])
        } else {
          setCurrentCard(null)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentDeck.id]);

  
  const deleteFlashcard = (deletedCard) => {
    axios
      .delete(`flashcards/${deletedCard.id}`)
      .then((response) => {
        // console.log(response);
        const updatedCardsData = flashcardsData.filter(
          (card) => card.id !== deletedCard.id
        );
        setFlashcardsData(updatedCardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const OptionsButton = ({ children, ...otherProps }) => (
    <button 
      className="options-button" 
      type="button"
      {...otherProps}>
      {children}
    </button>
  )

  const createNewFlashcard = (newCardData) => {
    // newCardData shape -> { "front": flashcardFront, "back": flashcardBack }
    axios
      .post(`http://127.0.0.1:5000/decks/${currentDeck.id}/flashcards`, newCardData)
      .then((response) => {
        // console.log("Response:", response);
        const flashcards = [...flashcardsData];
        flashcards.push(response.data);
        setFlashcardsData(flashcards);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="main-container">
      <section className="decks-list-container">
        <DecksList 
          decksData={decksData}
          updateCurrentDeck={updateCurrentDeck}
        />
        <NewDeck createNewDeck={createNewDeck} />
      </section>

      <section className="flashcard-area-container">
        {currentDeck.id ? (
          <FlashcardsContainer currentDeck={currentDeck} currentCard={currentCard} />
        ) : (
          <div>Select a deck</div>
        )}
      </section>

      <section className="options-container">
        <h2>Options</h2>
        <div className="delete-buttons">
          <OptionsButton  onClick={deleteDeck}>Delete Current Deck</OptionsButton >
          <OptionsButton  onClick={()=>{console.log("deleting card")}}>Delete Current Card</OptionsButton >
        </div>
        <RunnableCodeEditor 
          currentDeckId={currentDeck.id}
          createNewFlashcard={createNewFlashcard}>
        </RunnableCodeEditor> 
        {/* <NonrunnableCodeEditor updateNewFlashCardBack={updateNewFlashCardBack}></NonrunnableCodeEditor> */}
        {/* <OptionsButton onClick={createNewFlashcard}>Add New Card</OptionsButton > */}
      </section>
    </div>
  );
};

export default FlashcardPage;