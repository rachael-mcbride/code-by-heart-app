import axios from "axios";
import { useState, useEffect } from "react";

import FlashcardDetailsList from '../../components/flashcard-details-list/flashcard-details-list.component';

import './deck-details-page.styles.scss';

const DeckDetailsPage = ({ deckId, deckName, toggleDeckDetailsPage, deleteDeck }) => {
  const [flashcardsData, setFlashcardsData] = useState(null);
  const [totalCardNum, setTotalCardNum] = useState(0);
  const [cardsUpForReviewNum, setCardsUpForReviewNum] = useState(0);

  // load flashcards and numerical data when component first mounts
  useEffect(() => {
    const loadFlashcards = () => {
    axios
    // .post(`${process.env.REACT_APP_BACKEND_URL}/decks/${currentUser.id}`, newDeckData)
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/decks/${deckId}/flashcards`
      )
      .then((response) => {
        const flashcards = response.data;
        setFlashcardsData(flashcards);
        setTotalCardNum(flashcards.length);

        // calculate which cards are currently up for review
        let totalCardsUpForReview = 0;
        let rightNow = new Date();
        for (let i = 0; i < flashcards.length; i++) {
          let cardReviewDate = new Date(flashcards[i].date_to_review);
          if (cardReviewDate < rightNow) {
            totalCardsUpForReview++
          };
        };
        setCardsUpForReviewNum(totalCardsUpForReview)
      })
      .catch((error) => {
        console.log(error);
      });
    };
    loadFlashcards();
  }, []);

  useEffect(() => {
    setCardsUpForReviewNum(cardsUpForReviewNum)
  }, [cardsUpForReviewNum])

  return (
    <div className="deck-details-page">
      <div className="deck-info">
        <div className="deck-title">{deckName}</div>
        <div className="number-info">
          <div className="total-card-num">
            Total cards:<b>{totalCardNum}</b>
          </div>
          <div className="up-for-review-num">
            Cards up for review: <b>{cardsUpForReviewNum}</b>
          </div>
        </div>
        <div className="return-button">
          <button onClick={toggleDeckDetailsPage}>
            Return to Review Session
          </button>
        </div>
      </div>
      { flashcardsData && 
      <div className="flashcard-details-area">
        <div className="flashcards-list">
          <FlashcardDetailsList flashcardsData={flashcardsData} />
        </div> 
        <div className="delete-deck">
          <button onClick={deleteDeck}>
            Delete Deck
          </button>
        </div>
      </div> }
    </div>
  );
};

export default DeckDetailsPage;