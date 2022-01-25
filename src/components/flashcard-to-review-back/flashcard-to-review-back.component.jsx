import './flashcard-to-review-back.styles.scss'
// import PropTypes from "prop-types";
import CodeMirror from "@uiw/react-codemirror"
import 'codemirror/theme/xq-light.css'

const FlashcardBack = ({ backMsg, language, cardBackReveal, revealCardAnswerFunc }) => {
  let indentUnit = 2
  if (language === "python") {
    indentUnit = 4;
  } 

  if (cardBackReveal === true) {
    return (
      <div className="flashcard-back-revealed">
          <CodeMirror className="code-mirror"
            value={backMsg}
            options={{
                theme: 'xq-light',
                indentUnit: `${indentUnit}`,
                mode: `${language}`,
                lineNumbers: false,
                readOnly: true,
                cursorBlinkRate: -1
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

// FlashcardBack.propTypes = {
//   backMsg: PropTypes.string,
//   cardBackReveal: PropTypes.bool,
//   revealCardAnswerFunc: PropTypes.func
// };

export default FlashcardBack;