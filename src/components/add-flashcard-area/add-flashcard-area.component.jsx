import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import CustomButton from '../custom-button/custom-button.component'
import LanguageDropDown from '../language-drop-down/language-drop-down.component'
import CodeMirror from "@uiw/react-codemirror"
import 'codemirror/theme/xq-light.css'
import './add-flashcard-area.styles.scss'


const AddFlashCardArea = ( { createNewFlashcard, currentDeckId } ) => {
  const [codeToRun, setCodeToRun] = useState(null)
  const [codeInOutputContainer, setCodeInOutputContainer] = useState(null)
  const [newFlashcardFront, setNewFlashcardFront] = useState("");
  const [newFlashcardBack, setNewFlashcardBack] = useState("");
  const [frontCMPlaceholderValue, setFrontCMPlaceholderValue] = useState("create front of new card")
  const [backCMPlaceholderValue, setBackCMPlaceholderValue] = useState("create back of new card")
  const [language, setLanguage] = useState("Markdown");
  const [indentUnitInfo, setindentUnitInfo] = useState(4);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // console.log("current language:", language)
  }

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

  // prevents user from adding a flashcard with an empty front or back message
  const newFlashcardIsEnabled = newFlashcardFront.length > 0 && newFlashcardBack.length > 0;

  // func that will call the Jdoodle code compiler
  const runCode = () => {
    if (language.toLowerCase() === "markdown") {
      setCodeInOutputContainer("Make sure you've selected a programming language.")
    } else {
      const compileData = {"code" : codeToRun, "language" : language.toLowerCase()}
      axios
      .post(`http://127.0.0.1:5000/compile`, compileData)
      .then((response) => {
          const output = response.data
          // TO DO -- figure out how to output a better error message
          // if (response.data.includes("jdoodle.py")) { // error msg should be displayed
          //   const shorterErrorMsg = output.substring(output.indexOf('E'));
          //   setCodeInOutputContainer(shorterErrorMsg)
          // } 
          setCodeInOutputContainer(output)
      })
      .catch((error) => {
          console.log("there was an error:", error);
      });
    }
  }

  const submitNewCard = (event) => {
    event.preventDefault();
    createNewFlashcard ({ "front": newFlashcardFront, "back": newFlashcardBack});

    // clear placeholder messages as a sign to user that their submission went through
    setFrontCMPlaceholderValue("");
    setBackCMPlaceholderValue("");
    
    // clean up 
    setNewFlashcardFront("");
    setNewFlashcardBack("");
  };

  const OptionsButton = ({ children, ...otherProps }) => (
    <button 
      className="options-button" 
      type="button"
      {...otherProps}>
      {children}
    </button>
  )

    // make it so add new card button only renders once a deck is clicked on 
  return (
    <div className="add-flashcards-container">
      <div className="add-flashcards-header-container">
        <h2 className="add-flashcards-title">Add Flashcards</h2>
        <LanguageDropDown
          language={language}
          handleLanguageChange={handleLanguageChange}
        ></LanguageDropDown>
      </div>

      <div className="add-card-area">
        <CodeMirror className="code-mirror"
          value={frontCMPlaceholderValue}
          options={{
              theme: 'xq-light',
              indentUnit: `${indentUnitInfo}`,
              mode: `${language}`
            }}
          height="150px"
          width="380px"
          onChange={(editor) => {
            console.log('value:', editor.getValue());
            setCodeToRun(editor.getValue());
            setNewFlashcardFront(editor.getValue())
          }}/>

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
          <CodeMirror className="code-mirror"
            value={backCMPlaceholderValue}
            options={{
                theme: 'xq-light',
                indentUnit: `${indentUnitInfo}`,
                mode: `${language}`
              }}
            height="150px"
            width="380px"
            onChange={(editor) => {
              console.log('value:', editor.getValue());
              setNewFlashcardBack(editor.getValue())
            }}/>
        </div>
      </div>
      {currentDeckId && // only render button if a deck has been selected
        <OptionsButton 
          disabled={!newFlashcardIsEnabled}
          onClick={submitNewCard}>
            Add New Card
        </OptionsButton>}
    </div>
  )
}

AddFlashCardArea.propTypes = {
  createNewFlashcard: PropTypes.func,
  currentDeckId: PropTypes.number
};


export default AddFlashCardArea;