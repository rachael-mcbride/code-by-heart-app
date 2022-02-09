import PropTypes from "prop-types";

import DeckTitle from "../deck-title/deck-title.component";

import "./decks-list.styles.scss";

const DecksList = ({ decksData, updateCurrentDeck, currentDeck }) => {
  const decks = decksData;
  const myDecksList = decks.map((deck) => {
    const selectedBool = (currentDeck.id === deck.id) ? true : false;
    return (
      <DeckTitle
        key={deck.id}
        selected={selectedBool}
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
};

DecksList.propTypes = {
  updateCurrentDeck: PropTypes.func,
  currentDeck: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    owner_id: PropTypes.string,
    num_total_cards: PropTypes.number,
    num_cards_up_for_review: PropTypes.number,
  }),
  decksData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      name: PropTypes.string,
      owner_id: PropTypes.string,
      num_total_cards: PropTypes.number,
      num_cards_up_for_review: PropTypes.number,
    })
  ),
};


export default DecksList;