import './flashcard-back.styles.scss'
import PropTypes from "prop-types";
import CodeMirror from "@uiw/react-codemirror"
import 'codemirror/theme/yonce.css'

const FlashcardBack = ({ backMsg, cardBackReveal, revealCardAnswerFunc }) => {
  // console.log("flashcardBack:", backMsg)

  if (cardBackReveal === true) {
    return (
      <div className="flashcard-back-revealed">
          <CodeMirror className="code-mirror"
            value={backMsg}
            options={{
                theme: 'yonce',
                indentUnit: 4,
                mode: 'python',
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

FlashcardBack.propTypes = {
  backMsg: PropTypes.string,
  cardBackReveal: PropTypes.bool,
  revealCardAnswerFunc: PropTypes.func
};

export default FlashcardBack;