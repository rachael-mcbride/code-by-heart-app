import PropTypes from "prop-types";
import './flashcard-front.styles.scss'

const FlashcardFront = ({ front, deleteFlashcard }) => {
  // console.log("flashcardFront:", front)
  let frontMsg = "";

  if (!front) {
    frontMsg = "You have no cards to review.";
  } else {
    frontMsg = front;
  }

  return (
    <div className="flashcard-front">
      <div className="front-text">{frontMsg}</div>
    </div>
  );
};

FlashcardFront.propTypes = {
  deleteFlashcard: PropTypes.func,
  front: PropTypes.string
};

export default FlashcardFront;