import { useState, useEffect } from 'react';
import PropTypes from "prop-types";

import CustomAceEditor from '../ace-editor/ace-editor.component';

import './flashcard-to-review-back.styles.scss'

const FlashcardBack = (
  { backMsg, language, cardBackReveal, revealCardAnswerFunc }) => {
  const [cardBack, setCardBack] = useState(null);

  // update back of card's Ace editor component when the backMsg changes
  useEffect(() => {
    setCardBack(
      <CustomAceEditor 
      code={backMsg} 
      theme={"github"}
      placeholderText={""}
      language={language} 
      height={'230px'} 
      width={'375px'}
      readOnly={true} 
      showLineNums={false}
    />)
  }, [backMsg]);
    
  if (cardBackReveal === true) {
    return (
      <div>
        <div className="flashcard-back-revealed">
          {cardBack}
        </div>
      </div>)
  } else {
    return (
      <div className="flashcard-back-not-revealed">
        <button className="button-in-flashcard"
          onClick={revealCardAnswerFunc}>
          Reveal Answer
        </button>
      </div>
    );
  }
};

FlashcardBack.propTypes = {
  language: PropTypes.string,
  frontMsg: PropTypes.string,
  cardBackReveal: PropTypes.bool,
  revealCardAnswerFunc: PropTypes.func
};

export default FlashcardBack;