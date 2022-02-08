import { useState, useEffect } from "react";
import axios from "axios";

import LanguageDropDown from '../language-drop-down/language-drop-down.component'
import EditableAceEditor from '../ace-editor/editable-ace-editor.component'

import './practice-code-sandbox.styles.scss'

const PracticeCodeSandbox = () => {
  const [codeInInputContainer, setCodeInIntputContainer] = useState(null);
  const [codeInOutputContainer, setCodeInOutputContainer] = useState(null);
  const [language, setLanguage] = useState("not selected");

  // useEffects // 
  // make sure language is always up-to-date
  useEffect(() => {
    handleLanguageChange(language)
    console.log("current language:", language)
  }, [language]); 

  // funcs that update states // 
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const updateInputContainer = (event) => {
    setCodeInIntputContainer(event)
  };

  const updateOutputContainer = (event) => {
    setCodeInOutputContainer(event)
  };

  // func that will call the Jdoodle code compiler // 
  const runCode = () => {
    if (language === "not selected") {
      setCodeInOutputContainer("Make sure you've selected a programming language.")
    } else {
      const compileData = {"code" : codeInInputContainer, "language" : language}
      axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/compile`, compileData)
      .then((response) => {
          // note: empty objs + non-empty arrays are special cases
          if (JSON.stringify(response.data) === '{}') { 
            setCodeInOutputContainer(`${`{}`}`)
          } else if (Array.isArray(response.data)) {
            setCodeInOutputContainer(`${`[${response.data}]`}`)
          } else {
            setCodeInOutputContainer(response.data)
          }
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
          <div className="sandbox-output-wrapper">
            <EditableAceEditor 
              language={language}
              showLineNums={true}
              code={codeInInputContainer}
              updateCode={updateInputContainer}
              theme={"chaos"}
              width={"430px"}
              height={"430px"}
              placeholderText="TYPE CODE HERE">
            </EditableAceEditor>
          </div>
          <div className="code-output-wrapper">
            <EditableAceEditor 
              language={language}
              showLineNums={false}
              code={codeInOutputContainer}
              updateCode={updateOutputContainer}
              theme={"github"}
              width={"410px"}
              height={"60px"} >
            </EditableAceEditor>
          </div>
        </div>
      </div>
  );
};

export default PracticeCodeSandbox;