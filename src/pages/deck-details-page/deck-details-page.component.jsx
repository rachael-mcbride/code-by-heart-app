import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useHistory } from "react-router-dom";

import CustomButton from '../../components/custom-button/custom-button.component';
import FlashcardDetailsList from '../../components/flashcard-details-list/flashcard-details-list.component';

import './deck-details-page.styles.scss';

const DeckDetailsPage = (
  { deckId, deckName, totalCardNum, toggleDeckDetailsPage, cardsUpForReview }
  ) => {
  const [flashcardsData, setFlashcardsData] = useState(null);

  // load flashcards when component first mounts
  useEffect(() => {
    const loadFlashcards = () => {
    axios
      .get(
        `http://127.0.0.1:5000/decks/${deckId}/flashcards`
      )
      .then((response) => {
        setFlashcardsData(response.data);
        // console.log("response details:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    };
    loadFlashcards();
  }, []);

  return (
    <div className="deck-details-page">
      <div className="deck-info">
        <div>Deck name: {deckName}</div>
        <div>Number of total cards in this deck: {totalCardNum}</div>
        <div>Number of cards up for review: {cardsUpForReview}</div>
      </div>
      <div className="return-button">
        <button onClick={toggleDeckDetailsPage}>
          Return to Review Session
        </button>
      </div>
      { flashcardsData && 
      <div className="flashcards-list">
        <FlashcardDetailsList flashcardsData={flashcardsData} />
      </div> }
    </div>
  );
};

export default DeckDetailsPage;