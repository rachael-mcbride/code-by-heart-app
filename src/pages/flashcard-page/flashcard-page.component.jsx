import React, { useEffect, useState } from 'react';
import axios from "axios";
import PropTypes from "prop-types";

import DeckDetailsPage from '../deck-details-page/deck-details-page.component'
import AddFlashcardArea from '../../components/add-flashcard-area/add-flashcard-area.component'
import DecksList from '../../components/decks-list/decks-list.component'
import NewDeck from '../../components/new-deck/new-deck.component'
import PracticeCodeSandbox from '../../components/practice-code-sandbox/practice-code-sandbox.component'
import ReviewFlashcardsArea from '../../components/review-flashcards-area/review-flashcards-area.component'
import ReviewFlashcardsMsg from '../../components/review-flashcards-msg/review-flashcards-msg.component'

import './flashcard-page.styles.scss'

const FlashcardPage = ({ currentUser }) => {
  // conditional rendering states // 
  const [deckDetailsButtonClicked, setDeckDetailsButtonClicked] = useState(false);
  const [addNewCardAreaRenders, setAddNewCardAreaRenders] = useState(false);

  // states tracking current deck and current card data // 
  const [decksData, setDecksData] = useState([])
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(
    { id: "", owner_id: "", name: "", num_total_cards : 0, 
    num_cards_up_for_review : 0 });
  const [currentCard, setCurrentCard] = useState({
    back: "", date_to_review: new Date(0), deck_id: null, difficulty_level: 0, 
    front: "", id: null, interval: 0, language: "", previous_ease_factor: 0, 
    previous_repetitions: 0 });
  const [currentUpForReviewCardsInDeck, setCurrentUpForReviewCardsInDeck] = 
  useState(currentDeck.num_cards_up_for_review);

  // Conditional rendering methods // 
  const toggleDeckDetailsPage = () => {
    setDeckDetailsButtonClicked(!deckDetailsButtonClicked);
  };

  const renderAddCardArea = () => {
    setAddNewCardAreaRenders(true);
  };

  // Deck methods // 
  const loadDecks = () => {
    const userData = {
      uid: currentUser.id,
      displayName: currentUser.displayName,
      email: currentUser.email
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/load-user-decks`, userData)
      .then((response) => {
        setDecksData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createNewDeck = (newDeck) => {
    const newDeckData = {
      deck_name: newDeck["name"]
    }
    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/decks/${currentUser.id}`, newDeckData)
    .then((response) => {
      const decks = [...decksData];
      decks.push(response.data);
      setDecksData(decks);
    })
    .catch((error) => {
      console.log(error)
    });
  };

  const updateCurrentDeck = (selectedDeck) => {
    setCurrentDeck(selectedDeck);
  };

  const decrementUpForReviewCards = () => {
    setCurrentUpForReviewCardsInDeck(currentUpForReviewCardsInDeck-1);
  };
  
  const deleteDeck = () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/decks/${currentDeck.id}`)
      .then((response) => {
        const updatedDecksData = decksData.filter(
          (deck) => deck.id !== currentDeck.id
        );
        setCurrentDeck({
          id: null, ownerId: "", name: "", numTotalCards: 0, 
          numCardsUpForReview: 0 })
        setDecksData(updatedDecksData);
        toggleDeckDetailsPage();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Flashcard methods // 
  const loadFlashcards = () => {
    if (currentDeck.id === null || currentDeck.id === "") {
      return;
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/decks/${currentDeck.id}/flashcards_to_review`
        )
        .then((response) => {
          setFlashcardsData(response.data);
          if (response.data.length > 0) {
            setCurrentCard(response.data[0])
          } else {
            setCurrentCard({
              back: "", date_to_review: new Date(0), deck_id: null, difficulty_level: 0,
              front: "", id: null, interval: 0, language: "", previous_ease_factor: 0,
              previous_repetitions: 0 })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const createNewFlashcard = (newCardData) => {
    // newCardData shape -> { "front": flashcardFront, "back": flashcardBack }
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/decks/${currentDeck.id}/flashcards`, newCardData)
      .then((response) => {
        const updatedCardsData  = [...flashcardsData];
        updatedCardsData.push(response.data);
        setFlashcardsData(updatedCardsData);
        setCurrentCard(currentCard)
        setCurrentUpForReviewCardsInDeck(currentUpForReviewCardsInDeck+1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelAddingNewCard = () => {
    setAddNewCardAreaRenders(false);
  };

  const deleteFlashcard = () => {
    axios
    // `${process.env.REACT_APP_BACKEND_URL}/flashcards/${currentCard.id}`
      .delete(`${process.env.REACT_APP_BACKEND_URL}/flashcards/${currentCard.id}`)
      .then((response) => {
        const updatedCardsData = flashcardsData.filter(
          (card) => card.id !== currentCard.id
        );
        setFlashcardsData(updatedCardsData);
        moveToNextCard();
        setCurrentUpForReviewCardsInDeck(currentUpForReviewCardsInDeck-1);
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
      setCurrentCard({
        back: "", date_to_review: new Date(0), deck_id: null, difficulty_level: 0,
        front: "", id: null, interval: 0, language: "", previous_ease_factor: 0,
        previous_repetitions: 0 })
      setCurrentDeck({ id: "", owner_id: "", name: "", num_total_cards : 0, 
        num_cards_up_for_review : 0 })
    } else {
      setCurrentCard(nextCard);
    }
  }

  // useEffects // 
  // load deck list when user logs in, when data in decks changes, or when
  // the # of up-for-review cards changes (i.e. from difficulty selection)
  useEffect(() => {
    loadDecks();
  }, [flashcardsData, currentCard, currentUpForReviewCardsInDeck]); 

  useEffect(() => {
    // when a new card is added to a previously-empty deck, 
    // set the current card to this card that was just added
    if (flashcardsData.length === 1) {
      setCurrentCard(flashcardsData[0]);
    };
  }, [flashcardsData]); 

  // load or reload flashcards whenever the current deck changes or the user 
  // clicks deckDetailsButton (b/c they could've edited cards on that page)
  useEffect(() => {
    loadFlashcards();
  }, [currentDeck.id, deckDetailsButtonClicked]);

  // ensure current flashcard always up-to-date (like post-`moveToNextCard` click)
  // also, whenever the currentCard changes (like after a user selects a difficulty),
  // make sure the currentUpForReview number is up-to-date) 
  // without this, sometimes the number lags behind! 
  useEffect(() => {
    setCurrentCard(currentCard);
    setCurrentUpForReviewCardsInDeck(currentDeck.num_cards_up_for_review)
  }, [currentCard]); 

  // ensure current deck always up-to-date (like after selecting new deck) 
  // as well as the numerical data for that deck
  useEffect(() => {
    updateCurrentDeck(currentDeck);
  }, [currentDeck, flashcardsData]);


  return (
    <div>
      {/* either render page of deck details or default flashcard page */}
      { deckDetailsButtonClicked ? 
      (<div>
      <DeckDetailsPage 
        deckId={currentDeck.id} 
        deckName={currentDeck.name}
        deleteDeck={deleteDeck}
        toggleDeckDetailsPage={toggleDeckDetailsPage} />
      </div>)
      : 
      (<div className="main-container">
        <div className="decks-list-wrapper">
          <DecksList 
            currentDeck={currentDeck}
            decksData={decksData}
            updateCurrentDeck={updateCurrentDeck}
          />
          <NewDeck createNewDeck={createNewDeck} />
        </div>

      {/* either render flashcards-to-review or a msg if no deck is selected */}
        <div className="review-flashcards-container">
          {currentDeck.id  ? (
            <ReviewFlashcardsArea
            currentDeck={currentDeck} 
            currentCard={currentCard}
            toggleDeckDetailsPage={toggleDeckDetailsPage}
            renderAddCardArea={renderAddCardArea}
            decrementUpForReviewCards={decrementUpForReviewCards}
            moveToNextCard={moveToNextCard}
            deleteFlashcard={deleteFlashcard} />
          ) : (
            <div className="select-a-deck-wrapper">
              <div className="select-a-deck-text">
                <ReviewFlashcardsMsg></ReviewFlashcardsMsg>
              </div>
            </div>
          )}
        </div>

        {/* either render add-flashcard-area or just a code sandbox */}
        <div className="add-flashcard-container">
        { addNewCardAreaRenders ? 
          (<AddFlashcardArea 
            currentDeckId={currentDeck.id}
            cancelAddingNewCard={cancelAddingNewCard}
            createNewFlashcard={createNewFlashcard}>
          </AddFlashcardArea>) : 
          (<PracticeCodeSandbox></PracticeCodeSandbox>) 
        } 
        </div>
      </div>)}
    </div>
  );
};

FlashcardPage.propTypes = {
  currentUser: PropTypes.shape({
    createdAt: PropTypes.object,
    displayName: PropTypes.string,
    id: PropTypes.string,
    email: PropTypes.string
  })
};

export default FlashcardPage;