// import PropTypes from "prop-types";
import "./review-flashcards-area.styles.scss";
import FlashcardFront from "../flashcard-to-review-front/flashcard-to-review-front.component.jsx";
import FlashcardBack from "../flashcard-to-review-back/flashcard-to-review-back.component.jsx";
// import NewFlashcard from "../new-flashcard/new-flashcard.component.jsx";
import CustomButton from '../custom-button/custom-button.component';
// import axios from "axios";
import { useState, useEffect } from "react";

const ReviewFlashcardsContainer = ({ currentCard, currentDeck, deleteDeck, deleteFlashcard, moveToNextCard }) => {
  const [cardBackReveal, setCardBackReveal] = useState(false);
  
  const revealCardAnswerFunc = () => {
    setCardBackReveal(true);
  }

  // resets the CardBackReveal back to false if new card or deck is clicked 
  useEffect(() => {
    const resetReveal = () => {
      setCardBackReveal(false)
    }
    resetReveal();
  }, [currentCard, currentDeck]);

  const SmallButton = ({ children, ...otherProps }) => (
    <button 
      className="delete-button" 
      type="button"
      {...otherProps}>
      {children}
    </button>
  )
  

  return (
    <div className="review-cards-container">
      <div className="deck-header">
        <h1 className="current-deck-title">{currentDeck.name}</h1>
        <div className="buttons-container">
          <div className="delete-buttons">
            <SmallButton onClick={deleteDeck}>
              Delete Deck
            </SmallButton>
            <SmallButton onClick={()=>{console.log("deleting card")}}>
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
        {currentCard && 
          <FlashcardFront 
            frontMsg={currentCard.front}>
          </FlashcardFront>
        } 
        { (!currentCard) && 
          <div>You have no cards up for review in this deck.</div>
        }
        {currentCard && 
          <FlashcardBack
            backMsg={currentCard.back}
            cardBackReveal={cardBackReveal}
            revealCardAnswerFunc={revealCardAnswerFunc}>
          </FlashcardBack>
        } 
      </div>
    </div>
  );
};

// ReviewFlashcardsContainer.propTypes = {
//   currentCard: PropTypes.shapes({}),
//   currentDeck: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     owner_id: PropTypes.string.isRequired,
//   }),
//   deleteDeck: PropTypes.func,
//   deleteFlashcard: PropTypes.func
// };

export default ReviewFlashcardsContainer;
