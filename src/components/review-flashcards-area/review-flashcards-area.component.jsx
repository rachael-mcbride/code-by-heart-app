// import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from 'axios';
import FlashcardFront from "../flashcard-to-review-front/flashcard-to-review-front.component.jsx";
import FlashcardBack from "../flashcard-to-review-back/flashcard-to-review-back.component.jsx";
import CardDifficultyDropDown from "../card-difficulty-drop-down/card-difficulty-drop-down.component";

import "./review-flashcards-area.styles.scss";
// import NewFlashcard from "../new-flashcard/new-flashcard.component.jsx";
// import CustomButton from '../custom-button/custom-button.component';
// import axios from "axios";

const ReviewFlashcardsArea = (
  { currentCard, currentDeck, deleteDeck, deleteFlashcard, moveToNextCard }
  ) => {
  const [cardBackReveal, setCardBackReveal] = useState(false);
  const [cardDifficultyLevel, setCardDifficultyLevel] = useState("Very Easy");

  // resets the CardBackReveal back to false if new card or deck is clicked 
  useEffect(() => {
    const resetReveal = () => {
      setCardBackReveal(false)
    }
    resetReveal();
  }, [currentCard, currentDeck]);

  const revealCardAnswerFunc = (event) => {
    setCardBackReveal(true);
  }

  // note: move this/change this... isn't needed!
  const SmallButton = ({ children, ...otherProps }) => (
    <button 
      className="small-button" 
      type="button"
      {...otherProps}>
      {children}
    </button>
  )

  const handleDifficultyChange = (newLevel) => {
    setCardDifficultyLevel(newLevel);
  }

  const submitDifficultyLevel = () => {
    console.log("card pre-click:", currentCard)
    const difficultyData = { "difficultyString" : cardDifficultyLevel }
    axios
      .put(`http://127.0.0.1:5000/flashcards/${currentCard.id}`, difficultyData)
      .then((response) => {
          console.log("updated card post-click:", response)
      })
      .catch((error) => {
          console.log("there was an error", error);
      });
      // card gets updated in the DB + app moves onto the next card
      moveToNextCard() 
    };
    
  return (
    <div className="review-cards-container">
      <div className="deck-header">
        <h1 className="current-deck-title">{currentDeck.name}</h1>
        <div className="buttons-container">
          <div className="delete-buttons">
            <SmallButton onClick={deleteDeck}>
              Delete Deck
            </SmallButton>
            <SmallButton onClick={deleteFlashcard}>
              Delete Card
            </SmallButton>
          </div>
          <div className="next-card-button">
            <SmallButton onClick={moveToNextCard}>
              Next Card
            </SmallButton>
          </div>
        </div>
      </div>

      <div className="flashcard">
      { (!currentCard) && "You have no cards up for review." }
        {currentCard && 
          <div>
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
            <div className="card-difficulty-submission-features">
              <CardDifficultyDropDown 
                difficultyLevel={cardDifficultyLevel}
                handleDifficultyChange={handleDifficultyChange}>
              </CardDifficultyDropDown>
              <SmallButton onClick={submitDifficultyLevel}>
                Submit
              </SmallButton>
            </div> }
        </div>
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
//   moveToNextCard: PropTypes.func
// };

export default ReviewFlashcardsArea;
