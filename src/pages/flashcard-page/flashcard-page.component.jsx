import React, { useEffect, useState } from 'react';
import axios from "axios";

import AddFlashcardArea from '../../components/add-flashcard-area/add-flashcard-area.component'
import DecksList from '../../components/decks-list/decks-list.component'
import NewDeck from '../../components/new-deck/new-deck.component'
import ReviewFlashcardsArea from '../../components/review-flashcards-area/review-flashcards-area.component'
import ReviewFlashcardsMsg from '../../components/review-flashcards-msg/review-flashcards-msg.component'

import './flashcard-page.styles.scss'

const FlashcardPage = ( {currentUser} ) => {
  const [decksData, setDecksData] = useState([])
  const [currentDeck, setCurrentDeck] = useState({id: "", owner_id: "", name: "", number_of_cards : 0});
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  // DECK METHODS // 

  const loadDecks = () => {
    const userData = {
      uid: currentUser.id,
      displayName: currentUser.displayName,
      email: currentUser.email
    }
    axios
      .post("http://127.0.0.1:5000/load-user-decks", userData)
      .then((response) => {
        // console.log(response)
        setDecksData(response.data);
      })
      .catch((error) => {
        console.log("there was an error", error);
      });
  };

  const createNewDeck = (newDeck) => {
      const newDeckData = {
        deck_name: newDeck["name"]
      }
    axios
    .post(`http://127.0.0.1:5000/decks/${currentUser.id}`, newDeckData)
    .then((response) => {
      // console.log("response:", response.data);
      const decks = [...decksData];
      decks.push(response.data);
      setDecksData(decks);
    })
    .catch((error) => {
      console.log("error:", error)
    });
  };

  const updateCurrentDeck = (selectedDeck) => {
    setCurrentDeck(selectedDeck);
    // console.log("current deck was updated!")
    // console.log("Current deck is:", currentDeck);
  };
  
  const deleteDeck = () => {
    axios
      .delete(`http://127.0.0.1:5000/decks/${currentDeck.id}`)
      .then((response) => {
        // console.log(response);
        const updatedDecksData = decksData.filter(
          (deck) => deck.id !== currentDeck.id
        );
        setCurrentDeck({
          id: null,
          owner_id: "",
          name: "",
          number_of_cards: 0
        })
        setDecksData(updatedDecksData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // FLASHCARD METHODS // 

  const loadFlashcards = () => {
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
  };

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

  const deleteFlashcard = () => {
    axios
      .delete(`http://127.0.0.1:5000/flashcards/${currentCard.id}`)
      .then((response) => {
        console.log(response);
        const updatedCardsData = flashcardsData.filter(
          (card) => card.id !== currentCard.id
        );
        setFlashcardsData(updatedCardsData);
        moveToNextCard();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const moveToNextCard = () => {
    const idxOfNextCard = flashcardsData.indexOf(currentCard, 0) + 1
    const nextCard = flashcardsData[idxOfNextCard]
    const currentDeckLength = flashcardsData.length;
    if (idxOfNextCard === currentDeckLength) {
      setCurrentCard(null)
    } else {
      setCurrentCard(nextCard)
    }
    // console.log("idx of next card in deck:", idxOfNextCard);
    // console.log("next card details:", nextCard);
    // console.log("current deck length:", currentDeckLength);
  }

  // USE EFFECTS // 

  // load deck list when user logs in or when data in decks changes
  useEffect(() => {
    loadDecks();
    // when a new card is added to a previously-empty deck, 
    // set the current card to this card that was just added
    if (flashcardsData.length === 1) {
      setCurrentCard(flashcardsData[0]);
    }
  }, [flashcardsData]); 

  // load new flashcards whenever the current deck changes
  useEffect(() => {
    loadFlashcards()
  }, [currentDeck.id]);

  // ensure current flashcard always up-to-date (like post-`moveToNextCard` click)
  useEffect(() => {
    setCurrentCard(currentCard)
  }, [currentCard]); 

  // ensure current deck always up-to-date (like after selecting new deck)
  useEffect(() => {
    updateCurrentDeck(currentDeck);
    // console.log("flashcards data:", flashcardsData)
  }, [currentDeck, flashcardsData]); 

  return (
    <div className="main-container">
      <div className="decks-list-wrapper">
        <DecksList 
          currentDeck={currentDeck}
          decksData={decksData}
          updateCurrentDeck={updateCurrentDeck}
        />
        <NewDeck createNewDeck={createNewDeck} />
      </div>

      <section className="review-flashcards-container">
        {currentDeck.id ? (
          <ReviewFlashcardsArea
          currentDeck={currentDeck} 
          currentCard={currentCard}
          deleteDeck={deleteDeck}
          moveToNextCard={moveToNextCard}
          deleteFlashcard={deleteFlashcard} />
        ) : (
          <div className="select-a-deck-wrapper">
            <div className="select-a-deck-text">
              <ReviewFlashcardsMsg decksLength={decksData.length}></ReviewFlashcardsMsg>
            </div>
          </div>
        )}
      </section>

      <section className="add-flashcard-container">
        <AddFlashcardArea 
          currentDeckId={currentDeck.id}
          createNewFlashcard={createNewFlashcard}>
        </AddFlashcardArea> 
      </section>
    </div>
  );
};

export default FlashcardPage;