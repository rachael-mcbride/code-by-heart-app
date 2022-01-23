import PropTypes from "prop-types";
import "./flashcards-container.styles.scss";
import FlashcardFront from "../flashcard-front/flashcard-front.component.jsx";
import FlashcardBack from "../flashcard-back/flashcard-back.component.jsx";
// import NewFlashcard from "../new-flashcard/new-flashcard.component.jsx";
// import CustomButton from '../custom-button/custom-button.component';
// import axios from "axios";
import { useState, useEffect } from "react";

const FlashcardsContainer = ( { currentCard, currentDeck }) => {
  const [cardBackReveal, setCardBackReveal] = useState(false);
  
  const revealCardAnswerFunc = () => {
    setCardBackReveal(true);
  }

  // resets the CardBackReveal back to false if new card or deck is clicked on 
  useEffect(() => {
    const resetReveal = () => {
      setCardBackReveal(false)
    }
    resetReveal();
  }, [currentCard, currentDeck]);
  

  return (
    <div className="deck-wrapper">
      <div className="deck-header">
        <h1 className="current-deck-title">{currentDeck.name}</h1>
        {/* <CustomButton onClick={deleteDeck}>Delete Deck</CustomButton> */}
      </div> 
      {/* <div className="new-card-submission-container">
        <NewFlashcard createNewFlashcard={createNewFlashcard} />
      </div> */}
      <section className="flashcard">
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

      </section>
    </div>
  );
};

// FlashcardsContainer.propTypes = {
//   currentDeck: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     owner_id: PropTypes.string.isRequired,
//   }),
// };

export default FlashcardsContainer;
