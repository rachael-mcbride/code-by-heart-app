import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import LanguageDropDown from '../language-drop-down/language-drop-down.component'
import CustomAceEditor from '../ace-editor/ace-editor.component'

import './add-flashcard-area.styles.scss'

const AddFlashCardArea = ({ createNewFlashcard, cancelAddingNewCard, currentDeckId }) => {
  const [newFlashcardFront, setNewFlashcardFront] = useState("");
  const [newFlashcardBack, setNewFlashcardBack] = useState("");
  const [codeInOutputContainer, setCodeInOutputContainer] = useState(null);
  const [language, setLanguage] = useState("not selected");

  // funcs that update states // 
  const handleLanguageChange = (newLanguage) => {
    console.log(newLanguage);
    setLanguage(newLanguage.toLowerCase());
  };

  const updateCardFront = (event) => {
    setNewFlashcardFront(event)
  };

  const updateCardBack = (event) => {
    setNewFlashcardBack(event)
  };

  const updateOutputContainer = (event) => {
    setCodeInOutputContainer(event)
  };

  // func that will call the Jdoodle code compiler // 
  const runCode = () => {
    if (language.toLowerCase() === "plain text" || language === "not selected") {
      setCodeInOutputContainer("Make sure you've selected a programming language.")
    } else {
      const compileData = {"code" : newFlashcardFront, "language" : language.toLowerCase()}
      axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/compile`, compileData)
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
  };

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

  // useEffect to make sure language is always up-to-date // 
  useEffect(() => {
    handleLanguageChange(language)
    console.log("current language:", language)
  }, [language]); 

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
        <div className="card-output-wrapper">
            <CustomAceEditor 
              language={language}
              code={newFlashcardFront}
              theme={"chaos"}
              showLineNums={true}
              readOnly={false}
              updateCode={updateCardFront}
              height={"185px"}
              width={"430px"}
              placeholderText={"FLASHCARD FRONT"} />
          </div>
          <div className="divider"></div>
          <div className="card-output-wrapper">
            <CustomAceEditor 
              language={language}
              theme={"chaos"}
              showLineNums={true}
              readOnly={false}
              code={newFlashcardBack}
              updateCode={updateCardBack}
              height={"185px"}
              width={"430px"}
              placeholderText={"FLASHCARD BACK"} />
          </div>
          <div className="code-output-wrapper">
            <CustomAceEditor 
              language={language}
              showLineNums={false}
              readOnly={true}
              code={codeInOutputContainer}
              updateCode={updateOutputContainer}
              theme={"github"}
              width={"410px"}
              height={"75px"} />
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

AddFlashCardArea.propTypes = {
  createNewFlashcard: PropTypes.func,
  cancelAddingNewCard: PropTypes.func,
  currentDeckId: PropTypes.string
};

export default AddFlashCardArea;