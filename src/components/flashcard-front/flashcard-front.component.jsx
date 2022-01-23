import PropTypes from "prop-types";
import CodeMirror from "@uiw/react-codemirror"
import 'codemirror/theme/xq-light.css'
import './flashcard-front.styles.scss'

const FlashcardFront = ({ frontMsg, deleteFlashcard }) => {
  // console.log("flashcardFront:", front)
  const frontMsgToRender = (!frontMsg) ? "You have no cards to review." : frontMsg;

  // if (!frontMsg) {
  //   frontMsgToRender = "You have no cards to review.";
  // } else {
  //   frontMsgToRender= frontMsg;
  // }

  return (
    <div className="flashcard-front">
      <div>
        <CodeMirror className="code-mirror"
          value={frontMsgToRender}
          options={{
              theme: 'xq-light',
              indentUnit: 4,
              mode: 'python',
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

FlashcardFront.propTypes = {
  deleteFlashcard: PropTypes.func,
  front: PropTypes.string
};

export default FlashcardFront;