import PropTypes from "prop-types";
import "./flashcards-container.styles.scss";
import FlashcardFront from "../flashcard-front/flashcard-front.component.jsx";
import FlashcardBack from "../flashcard-back/flashcard-back.component.jsx";
// import NewFlashcard from "../new-flashcard/new-flashcard.component.jsx";
// import CustomButton from '../custom-button/custom-button.component';
// import axios from "axios";
import { useState } from "react";

const FlashcardsContainer = ( { currentCard, currentDeck }) => {
  const [revealCardAnswer, SetRevealCardAnswer] = useState(false)



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
            front={currentCard.front}>
          </FlashcardFront>
        }
        {currentCard && 
          <FlashcardBack
            back={currentCard.back} revealAnswer={revealCardAnswer}>
          </FlashcardBack>
        }

      </section>
    </div>
  );
};

FlashcardsContainer.propTypes = {
  currentDeck: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner_id: PropTypes.string.isRequired,
  }),
};

export default FlashcardsContainer;
