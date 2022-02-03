// import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from 'axios';
import { ReactComponent as Logo } from '../../assets/heart-logo.svg'
import FlashcardFront from "../flashcard-to-review-front/flashcard-to-review-front.component";
import FlashcardBack from "../flashcard-to-review-back/flashcard-to-review-back.component";

import "./review-flashcards-area.styles.scss";

const ReviewFlashcardsArea = ( 
  { currentCard, currentDeck, deleteFlashcard, moveToNextCard, 
    renderAddCardArea, toggleDeckDetailsPage, decrementUpForReviewCards }
  ) => {
  const [cardBackReveal, setCardBackReveal] = useState(false);
  // const [cardDifficultyLevel, setCardDifficultyLevel] = useState("Very Easy");

  const revealCardAnswerFunc = (event) => {
    setCardBackReveal(true);
  }

  // const handleDifficultyChange = (newLevel) => {
  //   console.log(newLevel)
  //   setCardDifficultyLevel(newLevel.value);
  // }

  const submitDifficultyLevel = (level) => {
    // console.log("this is the level:", level)
    console.log("card pre-click:", currentCard)
    const difficultyData = { "difficultyString" : level }
    axios
      .put(`http://127.0.0.1:5000/flashcards/${currentCard.id}`, difficultyData)
      .then((response) => {
          console.log("updated card post-click:", response.data)
          const newDate = new Date(response.data.date_to_review);
          const rightNow = new Date(0);
          if (newDate > rightNow) {
            // console.log('the review date is later than right now!')
            decrementUpForReviewCards()
          }
      })
      .catch((error) => {
          console.log("there was an error", error);
      });
      moveToNextCard() // difficulty gets updated in DB; app moves to next card
    };

    // resets the CardBackReveal back to false if new card or deck is clicked 
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
          {/* conditionally renders either flashcards 
          or msg informing user that no cards in deck are up-for-review */}
          {currentCard.id ? 
            (<div>
              <FlashcardFront 
                language = {currentCard.language}
                frontMsg = {currentCard.front}>
              </FlashcardFront>
              <FlashcardBack
                language = {currentCard.language}
                backMsg = {currentCard.back}
                cardBackReveal={cardBackReveal}
                revealCardAnswerFunc={revealCardAnswerFunc}>
              </FlashcardBack>
              { cardBackReveal && 
              <div className="difficulty-buttons">
                <button className="difficulty-button-very-easy" 
                  onClick={() => submitDifficultyLevel('Very Easy')}>
                  Very Easy
                </button>
                <button className="difficulty-button"
                  onClick={() => submitDifficultyLevel('Easy')}>
                  Easy
                </button>
                <button className="difficulty-button"
                  onClick={() => submitDifficultyLevel('Medium')}>
                  Medium
                </button>
                <button className="difficulty-button"
                  onClick={() => submitDifficultyLevel('Hard')}>
                  Hard
                </button>
                <button className="difficulty-button"
                  onClick={() => submitDifficultyLevel('Review again!')}>
                  Again!
                </button>
              </div> }
          </div>) 
          : 
        (<div className="review-session-finished">
          <div className="review-session-finished-msg">
            <div>No cards currently up-for-review</div>
          </div>
          <div className='logo-wrapper'>
            <Logo className='logo' />
          </div>
        </div>)
      }
      </div>
    </div>
  );
};

// ReviewFlashcardsContainer.propTypes = {
//   currentCard: PropTypes.shapes({
//     id: PropTypes.number.isRequired,
//     front: PropTypes.string.isRequired,
//     back: PropTypes.string.isRequired,
//     language: PropTypes.string.isRequired,
//     deck_id: PropTypes.number.isRequired,
//     difficulty_level: PropTypes.number.isRequired,
//     previous_repetitions: PropTypes.number.isRequired,
//     previous_ease_factor: PropTypes.number.isRequired,
//     interval: PropTypes.number.isRequired,
//     date_to_review: PropTypes.instanceOf(Date).isRequired,
//   }),
//   currentDeck: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     owner_id: PropTypes.string.isRequired,
//   }),
//   deleteDeck: PropTypes.func,
//   deleteFlashcard: PropTypes.func,
//   moveToNextCard: PropTypes.func,
//   renderAddCardArea: PropTypes.func
// };

export default ReviewFlashcardsArea;
