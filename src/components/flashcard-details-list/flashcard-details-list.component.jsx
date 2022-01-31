import OneFlashcardDetails from '../one-flashcard-details/one-flashcard-details.component'

import './flashcard-details-list.styles.scss'

const FlashcardDetailsList = ({ flashcardsData }) => {
  const flashcards = flashcardsData;
  const flashcardList = flashcards.map((flashcard) => {
    return (
      <OneFlashcardDetails
        key={flashcard.id}
        flashcard={flashcard}
      />
    );
  });

  return <div className="flashcards-list">{flashcardList}</div>;
};

export default FlashcardDetailsList;