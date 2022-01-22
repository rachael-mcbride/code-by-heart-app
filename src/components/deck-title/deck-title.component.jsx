import PropTypes from "prop-types";
import React from 'react';
import './deck-title.styles.scss'

const DeckTitle = ({ updateCurrentDeck, deckData }) => {
  const selectCurrentDeck = (event) => {
    event.preventDefault()
    const newCurrentDeck = {
      id: deckData.id,
      name: deckData.name,
      owner_id: deckData.owner_id
    };
    updateCurrentDeck(newCurrentDeck);
  };

  return (
    <section className='deck-titles'>
      <button onClick={selectCurrentDeck}>{deckData.name}</button>
    </section>
  );
};

DeckTitle.propTypes = {
  updateCurrentDeck: PropTypes.func,
  deckData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner_id: PropTypes.string.isRequired,
  }),
};

export default DeckTitle;