import PropTypes from "prop-types";
import "./decks-list.styles.scss";
import DeckTitle from "../deck-title/deck-title.component";

const DecksList = ({ decksData, updateCurrentDeck }) => {
  const decks = decksData;
  const myDecksList = decks.map((deck) => {
    // console.log(deck)
    return (
      <DeckTitle
        key={deck.id}
        deckData={deck}
        updateCurrentDeck={updateCurrentDeck}
      />
    );
  });


  return (
    <div className="decks-list-container">
      <h2 className="decks-header">Decks</h2>
      <section className="decks-list">{myDecksList}</section>
    </div>
  )
}

DecksList.propTypes = {
  updateCurrentDeck: PropTypes.func,
  decksData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      owner_id: PropTypes.string.isRequired,
    })
  ),
};


export default DecksList;