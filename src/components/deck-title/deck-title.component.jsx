import PropTypes from "prop-types";
import React from 'react';
import './deck-title.styles.scss'

const DeckTitle = ({ updateCurrentDeck, deckData, selected }) => {
  const selectCurrentDeck = (event) => {
    console.log(deckData)
    event.preventDefault()
    const newCurrentDeck = {
      id: deckData.id,
      name: deckData.name,
      owner_id: deckData.owner_id,
      num_total_cards: deckData.num_total_cards,
      num_cards_up_for_review: deckData.num_cards_up_for_review
    };
    updateCurrentDeck(newCurrentDeck);
  };

  // conditional styling features //  
  // change color of # based on how many cards are up for review 
  const inputStyle = (deckData.num_cards_up_for_review === 0) ? 
  { color: 'green' } : { color: '#DC143C' } ;

  // change button color depending on if this is a selected deck of not 
  const typeOfDeckTitle = (selected) ? 
  'selected-deck-title' : 'not-selected-deck-title';

  return (
    <section className={typeOfDeckTitle}>
      <button onClick={selectCurrentDeck}>
        <span className='deck-name'>{deckData.name}</span> 
        <span className='flashcard-number' style={inputStyle}>
          {deckData.num_cards_up_for_review}
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