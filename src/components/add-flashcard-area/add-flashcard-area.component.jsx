import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import axios from "axios";

import CustomButton from '../custom-button/custom-button.component'
import LanguageDropDown from '../language-drop-down/language-drop-down.component'
import EditableAceEditor from '../ace-editor/editable-ace-editor.component'

import './add-flashcard-area.styles.scss'

const AddFlashCardArea = ({ createNewFlashcard, currentDeckId }) => {
  const [newFlashcardFront, setNewFlashcardFront] = useState(null);
  const [newFlashcardBack, setNewFlashcardBack] = useState("");
  const [codeInOutputContainer, setCodeInOutputContainer] = useState(null);
  const [language, setLanguage] = useState("markdown");
  const [languageMode, setLanguageMode] = useState("markdown");
  const [indentUnitInfo, setindentUnitInfo] = useState(4);

  const frontPlaceholder = "Create the front of a new flashcard here or just \
test some code.\n\nMake sure you've selected a programming language \
before\nrunning your code.";

  const backPlaceholder = "Create the back of a new flashcard here.\n\nWhen \
you're happy with your new card's front and back, make\nsure you've \
selected the correct deck to which you want your\ncard to be added, then \
click the \"Add New Card\" button."

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
    setLanguageMode(language.toLowerCase());

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
    if (language.toLowerCase() === "markdown") {
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
      setCodeInOutputContainer("Alert -- make sure your card contains a front and back!");
    } else {
      const newData = { "front": newFlashcardFront, 
                        "back": newFlashcardBack, 
                        "language" : language.toLowerCase() }
        createNewFlashcard(newData);
        // tell user the card addition went through + clean up 
        setCodeInOutputContainer("Your card was successfully added.")
        setNewFlashcardFront("");
        setNewFlashcardBack("");
    }
  };

  const OptionsButton = ({ children, ...otherProps }) => (
    <button 
      className="options-button" 
      type="button"
      {...otherProps}>
      {children}
    </button>
  )

  return (
    <div className="add-flashcards-container">
      <div className="add-flashcards-header-container">
        <h2 className="add-flashcards-title">Add New Flashcard</h2>
        <LanguageDropDown
          language={language}
          includesMarkdown={true}
          handleLanguageChange={handleLanguageChange}
        />
      </div>

      <div className="add-card-area">
          <EditableAceEditor 
            languageMode={languageMode}
            code={newFlashcardFront}
            updateCode={updateCardFront}
            height={"200px"}
            placeholderText={frontPlaceholder}>
          </EditableAceEditor>
          <div className='output-wrapper'>
            <div className='output-text-container'>
              <div className='output-text'>
                {codeInOutputContainer}
              </div>
            </div>
            <CustomButton onClick={runCode}>
              Run Code
            </CustomButton>
          </div>
          <div>
          <EditableAceEditor 
            languageMode={languageMode}
            code={newFlashcardBack}
            updateCode={updateCardBack}
            height={"200px"}
            placeholderText={backPlaceholder}>
          </EditableAceEditor>
        </div>
      </div>
      {currentDeckId && // only render button if a deck has been selected
        <OptionsButton 
          onClick={submitNewCard}>
            Submit Card
        </OptionsButton>}
    </div>
  )
}

// AddFlashCardArea.propTypes = {
//   createNewFlashcard: PropTypes.func,
//   currentDeckId: PropTypes.string
// };

export default AddFlashCardArea;