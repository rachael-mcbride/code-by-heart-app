import PropTypes from "prop-types";
import React from 'react';
import './deck-title.styles.scss'

const DeckTitle = ({ updateCurrentDeck, deckData }) => {
  const selectCurrentDeck = (event) => {
    event.preventDefault()
    const newCurrentDeck = {
      id: deckData.id,
      name: deckData.name,
      owner_id: deckData.owner_id,
      number_of_cards: deckData.number_of_cards
    };
    updateCurrentDeck(newCurrentDeck);
  };

  return (
    <section className='deck-titles'>
      <button onClick={selectCurrentDeck}>
        <span className='deck-name'>{deckData.name}</span> 
        <span className='flashcard-number'>{deckData.number_of_cards}</span>
      </button>
    </section>
  );
};

DeckTitle.propTypes = {
  updateCurrentDeck: PropTypes.func,
  flashcardCount: PropTypes.number,
  deckData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner_id: PropTypes.string.isRequired,
  }),
};

export default DeckTitle;