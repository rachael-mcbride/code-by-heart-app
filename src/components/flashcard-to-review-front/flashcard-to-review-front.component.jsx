import PropTypes from "prop-types";

import CustomAceEditor from '../ace-editor/ace-editor.component';

import './flashcard-to-review-front.styles.scss'

const FlashcardFront = ({ frontMsg, language }) => {
  return (
    <div className="flashcard-front-container">
      <div className="flashcard-to-review-front"> 
          <CustomAceEditor 
          code={frontMsg} 
          theme={"github"}
          placeholderText={""}
          language={language} 
          height={'230px'} 
          width={'360px'}
          readOnly={true} 
          showLineNums={false}
        />
      </div>
    </div>
  );
};

FlashcardFront.propTypes = {
  language: PropTypes.string,
  frontMsg: PropTypes.string
};

export default FlashcardFront;