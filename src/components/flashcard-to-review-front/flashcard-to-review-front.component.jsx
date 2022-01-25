// import PropTypes from "prop-types";
import CodeMirror from "@uiw/react-codemirror"
import 'codemirror/theme/xq-light.css'
import './flashcard-to-review-front.styles.scss'

const FlashcardFront = ({ frontMsg, language }) => {
  // console.log("language:", language)
  // console.log("flashcardFront:", front)
  let indentUnit = 2;
  if (language === "python") {
    indentUnit = 4;
  }

  return (
    <div className="flashcard-front">
      <div>
        <CodeMirror className="code-mirror"
          value={frontMsg}
          options={{
              theme: 'xq-light',
              indentUnit: `${indentUnit}`,
              mode: `${language}`,
              lineNumbers: false,
            }}
          height="150px"
          width="320px"
          onChange={(editor) => {
            console.log('value:', editor.getValue());
          }}/>
      </div>
    </div>
  );
};

// FlashcardFront.propTypes = {
//   deleteFlashcard: PropTypes.func,
//   front: PropTypes.string
// };

export default FlashcardFront;