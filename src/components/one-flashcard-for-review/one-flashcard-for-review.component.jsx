import { ReactComponent as Logo } from '../../assets/heart-logo.svg'
import FlashcardFront from "../flashcard-to-review-front/flashcard-to-review-front.component";
import FlashcardBack from "../flashcard-to-review-back/flashcard-to-review-back.component";

import './one-flashcard-for-review.styles.scss'

const OneFlashCardForReview = ({ currentCard, cardBackReveal, 
      revealCardAnswerFunc, submitDifficultyLevel }) => {

  return ( 
    <div className="flashcard">
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
            onClick={() => submitDifficultyLevel('Very Easy')}>Very Easy
          </button>
          <button className="difficulty-button"
            onClick={() => submitDifficultyLevel('Easy')}>Easy
          </button>
          <button className="difficulty-button"
            onClick={() => submitDifficultyLevel('Medium')}>Medium
          </button>
          <button className="difficulty-button"
            onClick={() => submitDifficultyLevel('Hard')}>Hard
          </button>
          <button className="difficulty-button"
            onClick={() => submitDifficultyLevel('Review again!')}>Again!
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
      </div>) }
    </div>
  )
};

export default OneFlashCardForReview;