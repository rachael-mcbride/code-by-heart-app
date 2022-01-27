import PropTypes from "prop-types";
import React from 'react';
import './deck-title.styles.scss'

const DeckTitle = ({ updateCurrentDeck, deckData, selected }) => {
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

  // conditional styling features //  
  // change color of number based on how many cards are up for review 
  let inputStyle = { color: '#DC143C' };
  if (deckData.number_of_cards === 0) {
    inputStyle = { color: 'green' };
  }; 

  // change button color depending on if this is a selected deck of not 
  let typeOfDeckTitle = 'not-selected-deck-title';
  if (selected) {
    typeOfDeckTitle = 'selected-deck-title'
  }

  return (
    <section className={typeOfDeckTitle}>
      <button onClick={selectCurrentDeck}>
        <span className='deck-name'>{deckData.name}</span> 
        <span className='flashcard-number' style={inputStyle}>
          {deckData.number_of_cards}
        </span>
      </button>
    </section>
  );
};

DeckTitle.propTypes = {
  updateCurrentDeck: PropTypes.func,
  selected: PropTypes.bool,
  deckData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner_id: PropTypes.string.isRequired,
  }),
};

export default DeckTitle;