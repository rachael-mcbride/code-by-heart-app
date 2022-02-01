import React, { useState } from 'react';
import PropTypes from "prop-types";
import './new-deck.styles.scss';

const NewDeck = ({ createNewDeck }) => {
  const [formFields, setFormFields] = useState("");

  // this prevents user from adding a deck with no name to decks 
  const newDeckIsEnabled = formFields.length > 0;

  const onNameChange = (event) => {
    setFormFields(event.target.value);
  };

  const submitNewDeck = (event) => {
    event.preventDefault();
    createNewDeck({
      name: formFields
    });
    // console.log(formFields)
    setFormFields(""); // reset form
  };

  return (
    <form className="new-deck-style" onSubmit={submitNewDeck}>
      <input
        className="name-box"
        type="text"
        maxLength={18}
        placeholder="type new deck name"
        value={formFields.name}
        onChange={onNameChange}
      />
      <div className="submit-button">
        <input
          className="button"
          type="submit"
          value="Add new deck"
          disabled={!newDeckIsEnabled}
        />
      </div>
    </form>
  );
};

NewDeck.propTypes = {
  createNewDeck: PropTypes.func,
};

export default NewDeck;
