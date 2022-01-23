import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import CustomButton from '../custom-button/custom-button.component'
import CodeMirror from "@uiw/react-codemirror"
import 'codemirror/theme/yonce.css'
import './add-flashcard-area.styles.scss'


const RunnableCodeEditor = ( { createNewFlashcard, currentDeckId } ) => {
  const [codeToRun, setCodeToRun] = useState(null)
  const [codeInOutputContainer, setCodeInOutputContainer] = useState(null)
  const [newFlashcardFront, setNewFlashcardFront] = useState("");
  const [newFlashcardBack, setNewFlashcardBack] = useState("");
  const [frontCMPlaceholderValue, setFrontCMPlaceholderValue] = useState("#create front of new card")
  const [backCMPlaceholderValue, setBackCMPlaceholderValue] = useState("#create back of new card")

  // prevents user from adding a flashcard with an empty front or back message
  const newFlashcardIsEnabled = newFlashcardFront.length > 0 && newFlashcardBack.length > 0;

  // func that will call the Jdoodle code compiler
  const runCode = () => {
    axios
      .post(`http://127.0.0.1:5000/compile`, {"code" : codeToRun})
      .then((response) => {
          const output = response.data
          if (response.data.includes("jdoodle.py")) { // error msg should be displayed
            const shorterErrorMsg = output.substring(output.indexOf('E'));
            setCodeInOutputContainer(shorterErrorMsg)
          } else {
            setCodeInOutputContainer(output)
          }
      })
      .catch((error) => {
          console.log("there was an error:", error);
      });
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
    <div>
      <CodeMirror className="code-mirror"
        value={frontCMPlaceholderValue}
        options={{
            theme: 'yonce',
            indentUnit: 4,
            mode: 'python'
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
              theme: 'yonce',
              indentUnit: 4,
              mode: 'python'
            }}
          height="150px"
          width="380px"
          onChange={(editor) => {
            console.log('value:', editor.getValue());
            setNewFlashcardBack(editor.getValue())
          }}/>
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

RunnableCodeEditor.propTypes = {
  createNewFlashcard: PropTypes.func,
  currentDeckId: PropTypes.number
};


export default RunnableCodeEditor;