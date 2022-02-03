import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import axios from "axios";

import CustomButton from '../custom-button/custom-button.component'
import LanguageDropDown from '../language-drop-down/language-drop-down.component'
import EditableAceEditor from '../ace-editor/editable-ace-editor.component'


import './practice-code-sandbox.styles.scss'

const PracticeCodeSandbox = () => {
  const [codeInInputContainer, setCodeInIntputContainer] = useState(null);
  const [codeInOutputContainer, setCodeInOutputContainer] = useState(null);
  const [language, setLanguage] = useState("not selected");
  const [languageMode, setLanguageMode] = useState("python");
  const [indentUnitInfo, setindentUnitInfo] = useState(4);

  // useEffects // 
  // make sure language is always up-to-date
  useEffect(() => {
    handleLanguageChange(language)
    console.log("current language:", language)
  }, [language]); 

  // make sure indent is always up-to-date
  useEffect(() => {
    (language.toLowerCase() === 'python') ?
      setindentUnitInfo(4) : setindentUnitInfo(2)
    console.log("current indent:", indentUnitInfo)
  }, [language, indentUnitInfo]); 

  // funcs that update states // 
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setLanguageMode(newLanguage.toLowerCase());

    // console.log("current language:", language)
  }

  const updateInputContainer = (event) => {
    setCodeInIntputContainer(event)
  }

  // func that will call the Jdoodle code compiler // 
  const runCode = () => {
    if (language.toLowerCase() === "not selected") {
      setCodeInOutputContainer("Make sure you've selected a programming language.")
    } else {
      const compileData = {"code" : codeInInputContainer, "language" : language.toLowerCase()}
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
            includesMarkdown={false}
            handleLanguageChange={handleLanguageChange}
          />
        </div>
      </div>

      <div className="add-card-area">
          <EditableAceEditor 
            languageMode={languageMode}
            showLineNums={true}
            code={codeInInputContainer}
            updateCode={updateInputContainer}
            width={"430px"}
            height={"470px"}
            placeholderText="Select a language and type some code here.">
          </EditableAceEditor>
          <div className='output-text-container'>
            <div className='output-text'>
              {codeInOutputContainer}
            </div>
          </div>
        </div>
      </div>
  );
};

export default PracticeCodeSandbox;