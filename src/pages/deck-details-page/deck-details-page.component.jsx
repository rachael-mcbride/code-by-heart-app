import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useHistory } from "react-router-dom";

import CustomButton from '../../components/custom-button/custom-button.component';
import FlashcardDetailsList from '../../components/flashcard-details-list/flashcard-details-list.component';

import './deck-details-page.styles.scss';

const DeckDetailsPage = (
  { deckId, deckName, totalCardNum, toggleDeckDetailsPage, 
  cardsUpForReview, deleteDeck }
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
        <div className="deck-title">{deckName}</div>
        <div className="number-info">
          <div className="total-card-num">
            Total cards:<b>{totalCardNum}</b>
          </div>
          <div className="up-for-review-num">
            Cards up for review: <b>{cardsUpForReview}</b>
          </div>
        </div>
        <div className="return-button">
          <button onClick={toggleDeckDetailsPage}>
            Return to Review Session
          </button>
        </div>
      </div>
      { flashcardsData && 
      <div className="flashcards-list">
        <FlashcardDetailsList flashcardsData={flashcardsData} />
      </div> }

      <div className="delete-deck">
        <button onClick={deleteDeck}>
          Delete Deck
        </button>
      </div>
    </div>
  );
};

export default DeckDetailsPage;