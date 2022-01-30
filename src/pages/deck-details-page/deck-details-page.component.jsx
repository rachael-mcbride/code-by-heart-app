import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useHistory } from "react-router-dom";
import CustomButton from '../../components/custom-button/custom-button.component';
import FlashcardDetailsList from '../../components/flashcard-details-list/flashcard-details-list.component.jsx';
import './deck-details-page.styles.scss';

const DeckDetailsPage = ({ deckId, deckName, toggleDeckDetailsPage }) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const deckId = searchParams.get("deck");

  // const [deckName, setDeckName] = useState(null);
  const [totalCardNum, setTotalCardNum] = useState(0);
  const [totalCardsUpForReview, setTotalCardsUpForReview] = useState(0);
  const [flashcardsData, setFlashcardsData] = useState(null);

  // console.log("search params:", deckId);

  useEffect(() => {
    const loadFlashcards = () => {
    axios
      .get(
        `http://127.0.0.1:5000/decks/${deckId}/flashcards`
      )
      .then((response) => {
        // setDeckName(response.data[0].name);
        setTotalCardNum(response.data[0].num_total_cards);
        setTotalCardNum(response.data[0].num_cards_up_for_review);
        setFlashcardsData(response.data[1]);
        // console.log("response details:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    };
    loadFlashcards();
  }, []);

  // const flashcards = flashcardsData;
  // const myFlashcards = flashcards.map((flashcard) => {
  //   return (
  //     flashcard.name
  //   );
  // });

  // make sure deck details are always up-to-date
  useEffect(() => {
    // setDeckName(deckName);
    setTotalCardNum(totalCardNum);
    setTotalCardsUpForReview(totalCardsUpForReview);
  }, [deckName]);

  const navigate = useNavigate(); 
  const routeChange = () => { 
    const path = `/flashcards`; 
    navigate(path);
  };

  return (
    <div className="deck-details-page">
      <div className="deck-info">
        <div>Deck name: {deckName}</div>
        <div>Number of total cards in this deck: {totalCardNum}</div>
        <div>Number of cards up for review: {totalCardsUpForReview}</div>
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