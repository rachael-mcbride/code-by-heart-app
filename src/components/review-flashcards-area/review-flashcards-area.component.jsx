import { useState, useEffect } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

import OneFlashcardForReview from "../one-flashcard-for-review/one-flashcard-for-review.component";

import "./review-flashcards-area.styles.scss";

const ReviewFlashcardsArea = ( 
  { currentCard, currentDeck, deleteFlashcard, moveToNextCard, renderAddCardArea,
    toggleDeckDetailsPage, decrementUpForReviewCards }
  ) => {
  const [cardBackReveal, setCardBackReveal] = useState(false);

  const revealCardAnswerFunc = (event) => {
    setCardBackReveal(true);
  }

  const submitDifficultyLevel = (level) => {
    const difficultyData = { "difficultyString" : level }
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/flashcards/${currentCard.id}`, difficultyData)
      .then((response) => {
          const newDate = new Date(response.data.date_to_review);
          const rightNow = new Date(0);
          if (newDate > rightNow) {
            decrementUpForReviewCards()
          } 
      })
      .catch((error) => {
          console.log("there was an error", error);
      });
      moveToNextCard() 
    };

    // resets CardBackReveal to false if new card or deck is clicked 
    useEffect(() => {
      const resetReveal = () => {
        setCardBackReveal(false)
      }
      resetReveal();
    }, [currentCard, currentDeck]);
    
    return (
      <div className="review-cards-container">
        <div className="deck-header">
          <div className="current-deck-title">{currentDeck.name}</div>
          <div className="buttons-container">
              <div className="deck-details-button-container">
                <button className="deck-details-button" onClick={toggleDeckDetailsPage}>
                  Deck details
                </button>
              </div>
              <div className="card-buttons">
                <button className="card-button" onClick={deleteFlashcard}>
                  Delete Card
                </button>
                <button className="card-button" onClick={renderAddCardArea}>
                  Add Cards
                </button>
              </div>
          </div>
        </div>
        <div className="flashcard">
          <OneFlashcardForReview 
            currentCard={currentCard}
            cardBackReveal={cardBackReveal}
            submitDifficultyLevel={submitDifficultyLevel}
            revealCardAnswerFunc={revealCardAnswerFunc} />
        </div>
    </div>
  );
};

ReviewFlashcardsArea.propTypes = {
  currentCard: PropTypes.shape({
    back: PropTypes.string,
    date_to_review: PropTypes.string,
    deck_id: PropTypes.number,
    difficulty_level: PropTypes.number,
    front: PropTypes.string,
    id: PropTypes.number,
    interval: PropTypes.number,
    language: PropTypes.string,
    most_recent_difficulty_level: PropTypes.string,
    most_recent_review_date: PropTypes.string,
    previous_ease_factor: PropTypes.number,
    previous_repetitions: PropTypes.number,
    total_times_reviewed: PropTypes.number
  }),
  currentDeck: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    owner_id: PropTypes.string,
    num_cards_up_for_review: PropTypes.number,
    num_total_cards: PropTypes.number
  }),
  deleteFlashcard: PropTypes.func,
  moveToNextCard: PropTypes.func,
  renderAddCardArea: PropTypes.func,
  toggleDeckDetailsPage: PropTypes.func,
  decrementUpForReviewCards: PropTypes.func
};

export default ReviewFlashcardsArea;
