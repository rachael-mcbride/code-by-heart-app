// import PropTypes from "prop-types";
import "./review-flashcards-area.styles.scss";
import FlashcardFront from "../flashcard-front/flashcard-front.component.jsx";
import FlashcardBack from "../flashcard-back/flashcard-back.component.jsx";
// import NewFlashcard from "../new-flashcard/new-flashcard.component.jsx";
import CustomButton from '../custom-button/custom-button.component';
// import axios from "axios";
import { useState, useEffect } from "react";

const ReviewFlashcardsContainer = ({ currentCard, currentDeck, deleteDeck, deleteFlashcard }) => {
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

  const DeleteButton = ({ children, ...otherProps }) => (
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
        <div className="delete-buttons-container">
          <DeleteButton onClick={deleteDeck}>
            Delete Deck
          </DeleteButton>
          <DeleteButton onClick={()=>{console.log("deleting card")}}>
            Delete Card
          </DeleteButton>
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
