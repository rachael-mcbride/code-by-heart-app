import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import axios from "axios";

import CustomButton from '../custom-button/custom-button.component'
import LanguageDropDown from '../language-drop-down/language-drop-down.component'
import EditableAceEditor from '../ace-editor/editable-ace-editor.component'

import './add-flashcard-area.styles.scss'

const AddFlashCardArea = ({ createNewFlashcard, cancelAddingNewCard, currentDeckId }) => {
  const [newFlashcardFront, setNewFlashcardFront] = useState("");
  const [newFlashcardBack, setNewFlashcardBack] = useState("");
  const [codeInOutputContainer, setCodeInOutputContainer] = useState(null);
  const [language, setLanguage] = useState("not selected");
  const [languageMode, setLanguageMode] = useState("markdown");
  const [indentUnitInfo, setindentUnitInfo] = useState(4);

  const frontPlaceholder = "Front of new flashcard";
  const backPlaceholder = "Back of new flashcard";

  // useEffects // 
  // make sure language is always up-to-date
  useEffect(() => {
    handleLanguageChange(language)
    console.log("current language:", language)
  }, [language]); 

  // make sure indent is always up-to-date
  useEffect(() => {
    (language.toLowerCase() === 'python' || language.toLowerCase() === 'markdown') ?
      setindentUnitInfo(4) : setindentUnitInfo(2)
    console.log("current indent:", indentUnitInfo)
  }, [language, indentUnitInfo]); 

  // funcs that update states // 
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setLanguageMode(newLanguage.toLowerCase());

    // console.log("current language:", language)
  }

  const updateCardFront = (event) => {
    setNewFlashcardFront(event)
  }

  const updateCardBack = (event) => {
    setNewFlashcardBack(event)
  }

  // func that will call the Jdoodle code compiler // 
  const runCode = () => {
    if (language.toLowerCase() === "markdown" || language === "not selected") {
      setCodeInOutputContainer("Make sure you've selected a programming language.")
    } else {
      const compileData = {"code" : newFlashcardFront, "language" : language.toLowerCase()}
      axios
      .post(`http://127.0.0.1:5000/compile`, compileData)
      .then((response) => {
          // note: empty objs and arrays are a special case 
          if (JSON.stringify(response.data) === '{}') { 
            setCodeInOutputContainer(`${`{}`}`)
          } else if (JSON.stringify(response.data) === '[]') {
            setCodeInOutputContainer(`${`[]`}`)
          } else {
            setCodeInOutputContainer(response.data)
          }
        // console.log(response.data)
      })
      .catch((error) => {
          console.log("there was an error:", error);
      });
    }
  }

  // func that will add card to the DB // 
  const submitNewCard = (event) => {
    event.preventDefault();
    if (newFlashcardFront.length === 0 || newFlashcardBack.length === 0) {
      setCodeInOutputContainer("Make sure your card contains a front and back.");
    } else if (language === "not selected") {
      setCodeInOutputContainer("Make sure you've selected a language.");
    } else {
      const newData = { "front": newFlashcardFront, 
                        "back": newFlashcardBack, 
                        "language" : language.toLowerCase() }
        createNewFlashcard(newData);
        console.log("language:", language)
        // tell user the card addition went through + clean up 
        setCodeInOutputContainer("Your card was successfully added.")
        setNewFlashcardFront("");
        setNewFlashcardBack("");
    }
  };

  return (
    <div className="add-flashcards-container">
      <div className="add-flashcards-header-container">
        <div className="run-code-title">
          <button className="run-code-button" onClick={runCode}>
            Run Code
          </button>
        </div>
        <div className="add-flashcards-language-dropdown">
          <LanguageDropDown 
            language={language}
            includesMarkdown={true}
            handleLanguageChange={handleLanguageChange}
          />
        </div>
      </div>

      <div className="add-card-area">
          <EditableAceEditor 
            languageMode={languageMode}
            code={newFlashcardFront}
            showLineNums={true}
            updateCode={updateCardFront}
            height={"205px"}
            width={"430px"}
            placeholderText={frontPlaceholder}>
          </EditableAceEditor>
          <div className="divider"></div>
          <EditableAceEditor 
            languageMode={languageMode}
            showLineNums={true}
            code={newFlashcardBack}
            updateCode={updateCardBack}
            height={"205px"}
            width={"430px"}
            placeholderText={backPlaceholder}>
          </EditableAceEditor>
          <div className='output-wrapper'>
            <div className='output-text-container'>
              <div className='output-text'>
                {codeInOutputContainer}
              </div>
            </div>
          </div>
      </div>
      {currentDeckId && // only render button if a deck has been selected
        <div className="submit-or-cancel-buttons">
          <button className="capitalized-button" onClick={submitNewCard}>
            Submit Card
          </button>
          <button className="capitalized-button" onClick={cancelAddingNewCard}>
            Finish adding cards
          </button>
        </div>}
    </div>
  )
}

// AddFlashCardArea.propTypes = {
//   createNewFlashcard: PropTypes.func,
//   currentDeckId: PropTypes.string
// };

export default AddFlashCardArea;