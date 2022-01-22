import './flashcard-back.styles.scss'
import PropTypes from "prop-types";

const FlashcardBack = ({ back, revealCardAnswer }) => {
  console.log("flashcardBack:", back)

  if (revealCardAnswer) {
    return (
      <div className="flashcard-back-revealed">{back}</div>
    );
  }
  return (
    <div className="flashcard-back-not-revealed">Reveal Answer</div>
  );
};

FlashcardBack.propTypes = {
  deleteFlashcard: PropTypes.func,
  front: PropTypes.string
};

export default FlashcardBack;