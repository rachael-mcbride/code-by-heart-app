import PropTypes from "prop-types";
import "./decks-list.styles.scss";
import DeckTitle from "../deck-title/deck-title.component";

const DecksList = ({ decksData, updateCurrentDeck, flashcardsCount, currentDeck }) => {
  const decks = decksData;
  const myDecksList = decks.map((deck) => {
    let selectedBool = false;
    if (currentDeck.id === deck.id) {
      selectedBool = true;
    };
    return (
      <DeckTitle
        key={deck.id}
        selected={selectedBool}
        deckData={deck}
        updateCurrentDeck={updateCurrentDeck}
        flashcardsCount={flashcardsCount}
      />
    );
  });

  return (
    <div className="decks-list-container">
      <h2 className="decks-header">Decks</h2>
      <section className="decks-list">{myDecksList}</section>
    </div>
  )
};

// DecksList.propTypes = {
//   updateCurrentDeck: PropTypes.func,
//   decksData: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       owner_id: PropTypes.string.isRequired,
//     })
//   ),
// };


export default DecksList;