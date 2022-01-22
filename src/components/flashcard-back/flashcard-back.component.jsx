import React, { useState } from 'react';
import './flashcard-back.styles.scss'
import PropTypes from "prop-types";
import CodeMirror from "@uiw/react-codemirror"
import 'codemirror/theme/twilight.css'

const FlashcardBack = ({ back, revealCardAnswerFunc, cardBackReveal }) => {
  console.log("flashcardBack:", back)

  if (cardBackReveal === true) {
    return (
      <div className="flashcard-back-revealed">
          <CodeMirror className="code-mirror"
            value={back}
            options={{
                theme: 'twilight',
                indentUnit: 4,
                mode: 'python',
                lineNumbers: false,
              }}
            height="150px"
            width="320px"
            onChange={(editor) => {
              console.log('value:', editor.getValue());
            }}/>
      </div>)
  } else {
    return (
      <button className="flashcard-back-not-revealed" 
        onClick={revealCardAnswerFunc}>
        Reveal Answer
      </button>
    );
  }
};

FlashcardBack.propTypes = {
  deleteFlashcard: PropTypes.func,
  front: PropTypes.string
};

export default FlashcardBack;