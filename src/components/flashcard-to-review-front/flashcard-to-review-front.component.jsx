import PropTypes from "prop-types";
import './flashcard-to-review-front.styles.scss'
import FixedAceEditor from '../ace-editor/fixed-ace-editor.component';

const FlashcardFront = ({ frontMsg, language }) => {
  return (
    <div className="flashcard-front-container">
      <div className="flashcard-to-review-front"> 
          <FixedAceEditor
          msg={frontMsg} 
          language={language}
          height={'230px'}
          width={'360px'}/>
      </div>
    </div>
  );
};

FlashcardFront.propTypes = {
  language: PropTypes.string,
  frontMsg: PropTypes.string
};

export default FlashcardFront;