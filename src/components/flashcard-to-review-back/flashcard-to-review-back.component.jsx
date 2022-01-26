import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import CustomAceEditor from '../ace-editor/ace-editor.component';
import './flashcard-to-review-back.styles.scss'

const FlashcardBack = ({ backMsg, language, cardBackReveal, revealCardAnswerFunc }) => {
  const [cardBack, setCardBack] = useState(null);

  // update back of card's Ace editor when the backMsg changes
  useEffect(() => {
    setCardBack(
      <CustomAceEditor msg={backMsg} language={language} />)
  }, [backMsg]);
    
  if (cardBackReveal === true) {
    return (
      <div className="flashcard-back-revealed">
        {cardBack}
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
  language: PropTypes.string,
  frontMsg: PropTypes.string,
  cardBackReveal: PropTypes.bool,
  revealCardAnswerFunc: PropTypes.func
};

export default FlashcardBack;