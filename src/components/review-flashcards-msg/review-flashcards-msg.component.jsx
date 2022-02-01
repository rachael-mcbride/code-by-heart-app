import './review-flashcards-msg.styles.scss'

import FlashcardFront from "../flashcard-to-review-front/flashcard-to-review-front.component";
import FlashcardBack from "../flashcard-to-review-back/flashcard-to-review-back.component";

const ReviewFlashcardsMsg = () => {

  return (
      <div className="review-cards-container">
        <div className="deck-header">
          <div className="select-a-deck-title">Select a deck</div>
        </div>

        <div className="flashcard-placeholder">
          <div>Flashcards will appear here</div>
      </div>
    </div>
  );
}

export default ReviewFlashcardsMsg;