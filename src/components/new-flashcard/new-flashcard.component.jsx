import React, { useState } from 'react';
import './new-flashcard.styles.scss';
import PropTypes from "prop-types";

const NewFlashcard = ({ createNewFlashcard }) => {
  const [flashcardFront, setFlashcardFront] = useState("");
  const [flashcardBack, setFlashcardBack] = useState("");

  // prevents user from adding a flashcard with an empty front or back
  const newFlashcardIsEnabled = flashcardFront.length > 0 && flashcardBack.length > 0;

  const onFrontMessageChange = (event) => {
    setFlashcardFront(event.target.value);
  };

  const onBackMessageChange = (event) => {
    setFlashcardBack(event.target.value);
  };

  const submitNewCard = (event) => {
    event.preventDefault();
    createNewFlashcard ({ "front": flashcardFront, "back": flashcardBack });
    // reset message to empty after submitting 
    setFlashcardFront("");
    setFlashcardBack("");
  };

  return (
    <form className="create-card-container" onSubmit={submitNewCard}>
      <p className="create-new-card-label">Create New Card</p>
      <div className="front-message-label-and-box">
        <label className="front-message">Card front</label>
        <input
          type="text"
          value={flashcardFront}
          onChange={onFrontMessageChange}
          size="25"
        />
      </div>
      <div className="back-message-label-and-box">
        <label className="back-message">Card back</label>
        <input
          type="text"
          value={flashcardBack}
          onChange={onBackMessageChange}
          size="25"
        />
      </div>
      <div>
        <input
          className="add-new-flashcard-button"
          type="submit"
          value="Add card"
          disabled={!newFlashcardIsEnabled}
        />
      </div>
    </form>
  );
};

NewFlashcard.propTypes = {
  createNewCard: PropTypes.func,
};

export default NewFlashcard;
