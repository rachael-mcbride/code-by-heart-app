import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import CustomButton from '../custom-button/custom-button.component'
import LanguageDropDown from '../language-drop-down/language-drop-down.component'
import CodeMirror from "@uiw/react-codemirror"
import 'codemirror/theme/xq-light.css'
import './add-flashcard-area.styles.scss'

import EditableAceEditor from '../ace-editor/editable-ace-editor.component'

import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-ruby'
import 'ace-builds/src-noconflict/mode-swift'


const AddFlashCardArea = ( { createNewFlashcard, currentDeckId } ) => {
  const [codeToRun, setCodeToRun] = useState(null) // note - this is always the flashcard front
  const [newFlashcardBack, setNewFlashcardBack] = useState("");
  const [codeInOutputContainer, setCodeInOutputContainer] = useState(null)
  const [frontCMPlaceholderValue, setFrontCMPlaceholderValue] = useState("create front of new card")
  const [backCMPlaceholderValue, setBackCMPlaceholderValue] = useState("create back of new card")
  const [language, setLanguage] = useState("markdown");
  const [languageMode, setLanguageMode] = useState("");
  const [indentUnitInfo, setindentUnitInfo] = useState(4);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (newLanguage.toLowerCase() == "plain text") {
        setLanguageMode("markdown");
      } else {
        setLanguageMode(language.toLowerCase());
    };
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

  // func that will call the Jdoodle code compiler
  const runCode = () => {
    if (language.toLowerCase() === "plain text") {
      setCodeInOutputContainer("Make sure you've selected a programming language.")
    } else {
      const compileData = {"code" : codeToRun, "language" : language.toLowerCase()}
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

  const submitNewCard = (event) => {
    event.preventDefault();
    if (codeToRun.length === 0 || newFlashcardBack.length === 0) {
      setCodeInOutputContainer("Alert -- make sure your card contains a front and back!");
    } else {
      const newData = { "front": codeToRun, 
                        "back": newFlashcardBack, 
                        "language" : language.toLowerCase() }
        createNewFlashcard(newData);
        // tell user the card addition went through + clean up 
        setCodeInOutputContainer("Your card was successfully added.")
        // setNewFlashcardFront("");
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

  const updateCodeToRun = (event) => {
    setCodeToRun(event)
  }

  return (
    <div className="add-flashcards-container">
      <div className="add-flashcards-header-container">
        <h2 className="add-flashcards-title">Add Flashcards</h2>
        <LanguageDropDown
          language={language}
          handleLanguageChange={handleLanguageChange}
        />
      </div>

      <div className="add-card-area">
          <EditableAceEditor 
            languageMode={languageMode}
            codeToRun={codeToRun}
            updateCodeToRun={updateCodeToRun}>
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
          <CodeMirror className="code-mirror"
            value={backCMPlaceholderValue}
            options={{
                theme: 'xq-light',
                indentUnit: `${indentUnitInfo}`,
                smartIndent: false,
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