import PropTypes from "prop-types";

import OneFlashcardDetails from '../one-flashcard-details/one-flashcard-details.component'

import './flashcard-details-list.styles.scss'

const FlashcardDetailsList = ({ flashcardsData }) => {
  const flashcardList = flashcardsData.map((flashcard) => {
    return (
      <OneFlashcardDetails
        key={flashcard.id}
        flashcard={flashcard}
      />
    );
  });

  return <div className="flashcards-list">{flashcardList}</div>;
};

FlashcardDetailsList.propTypes = {
  flashcardsData: PropTypes.arrayOf(
    PropTypes.shape({
      back: PropTypes.string,
      date_to_review: PropTypes.string,
      deck_id: PropTypes.number,
      difficulty_level: PropTypes.number,
      front: PropTypes.string,
      id: PropTypes.number,
      interval: PropTypes.number,
      language: PropTypes.string,
      most_recent_difficulty_level: PropTypes.string,
      most_recent_review_date: PropTypes.string,
      previous_ease_factor: PropTypes.number,
      previous_repetitions: PropTypes.number,
      total_times_reviewed: PropTypes.number
    })
  )
};

export default FlashcardDetailsList;