import PropTypes from "prop-types";
import './flashcard-to-review-front.styles.scss'
import FixedAceEditor from '../ace-editor/fixed-ace-editor.component';

const FlashcardFront = ({ frontMsg, language }) => {
  return (
    <div className="flashcard-front">
      <FixedAceEditor msg={frontMsg} language={language}/>
    </div>
  );
};

FlashcardFront.propTypes = {
  language: PropTypes.string,
  frontMsg: PropTypes.string
};

export default FlashcardFront;