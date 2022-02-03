import axios from 'axios';
import { useState, useEffect } from 'react';
import FixedAceEditor from '../ace-editor/fixed-ace-editor.component';
import EditableAceEditor from '../ace-editor/editable-ace-editor.component';

import './one-flashcard-details.styles.scss'

const OneFlashcardDetails = ({ flashcard }) => {
  // attributes to display in "card details" box 
  const reviewDate = flashcard.date_to_review.slice(0, 22);
  const firstLetterOfLanguage = flashcard.language.slice(0, 1).toUpperCase();
  const restOfLanguage = flashcard.language.slice(1, flashcard.language.length);
  const language = firstLetterOfLanguage + restOfLanguage;
  const timesReviewed = flashcard.total_times_reviewed;
  const historyMessage = (flashcard.most_recent_difficulty_level !== null);

  // states for editing front and/or back of flashcard
  const [newFlashcardFront, setNewFlashcardFront] = useState(flashcard.front);
  const [newFlashcardBack, setNewFlashcardBack] = useState(flashcard.back);
  const [editButtonFrontClicked, setEditButtonFrontClicked] = useState(false);
  const [editButtonBackClicked, setEditButtonBackClicked] = useState(false);

  // functions for editing a card's front message 
  const updateCardFront = (event) => {
    setNewFlashcardFront(event)
  };

  const editFlashcardFront = () => { 
    setEditButtonFrontClicked(true);
  };

  const saveFlashcardFront = () => {
    const newData = { "front" : newFlashcardFront };
    axios
      .put(`http://127.0.0.1:5000/flashcards/${flashcard.id}`, newData)
      .then((response) => {
        console.log(response.data);
        setEditButtonFrontClicked(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // functions for editing a card's back message 
  const updateCardBack = (event) => {
    setNewFlashcardBack(event)
  };

  const editFlashcardBack = (msg) => { 
    setEditButtonBackClicked(true);
    console.log(editButtonBackClicked)
  };

  const saveFlashcardBack = () => {
    const newData = { "back" : newFlashcardBack };
    axios
      .put(`http://127.0.0.1:5000/flashcards/${flashcard.id}`, newData)
      .then((response) => {
        console.log(response.data);
        setEditButtonBackClicked(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffects to make sure states change immediately upon button clicks
  useEffect(() => {
    setEditButtonFrontClicked(editButtonFrontClicked);
  }, [editButtonFrontClicked]);

  useEffect(() => {
    setEditButtonBackClicked(editButtonBackClicked);
  }, [editButtonBackClicked]);

  // Edit Button 
  const EditButton = ({ children, ...otherProps }) => (
    <button 
      className="edit-button" 
      type="button"
      {...otherProps}>
      {children}
    </button>
  )

  return(
    <div className="one-flashcard-container">
      <div className="flashcard-details">
        <div className="flashcard-details-title">Card Details</div>
        <div className="flashcard-text"><b>Language</b>: {language}</div>
        <div className="flashcard-text">
          <b>Up for review on</b>: {reviewDate}
        </div>
        <div className="flashcard-text">
          <b>Previous times reviewed</b>: {timesReviewed}
        </div>
        <div className="flashcard-text"> </div>
        <div className="flashcard-text"> </div>
        { historyMessage && 
          <div className="flashcard-text">
            <b>Last marked</b> "{flashcard.most_recent_difficulty_level}"
            <b> on</b> {flashcard.most_recent_review_date.slice(0, 16)}
          </div> }
      </div>

    {/* renders fixed or editable area based on 'editButtonFrontClicked' state */}
      <div>
        { editButtonFrontClicked ? (
          <div className="flashcard-container">
            <div className="flashcard-side">Front</div>
            <div className="ace-editor-in-flashcard">
              <EditableAceEditor 
                placeholderText={"Click \"save\" when you are done editing."} 
                code={newFlashcardFront}
                language={flashcard.language}
                updateCode={updateCardFront}
                showLineNums={false}
                height={'95px'}
                width={'300px'}/> 
              <EditButton onClick={saveFlashcardFront}>Save</EditButton>
            </div>
          </div>)
          :
          (
          <div className="flashcard-container">
            <div className="flashcard-side">Front</div>
            <div className="ace-editor-in-flashcard">
              <FixedAceEditor 
                msg={newFlashcardFront} 
                language={flashcard.language}
                height={'95px'}
                width={'300px'}/>
              <EditButton onClick={editFlashcardFront}>Edit</EditButton>
            </div>
          </div>) }
      </div>

    {/* renders fixed or editable area based on 'editButtonBackClicked' state */}
      <div>
        { editButtonBackClicked ? (
          <div className="flashcard-container">
            <div className="flashcard-side">Back</div>
            <div className="ace-editor-in-flashcard">
              <EditableAceEditor 
                placeholderText={"Click \"save\" when you are done editing."} 
                code={newFlashcardBack}
                language={flashcard.language}
                updateCode={updateCardBack}
                showLineNums={false}
                height={'95px'}
                width={'300px'}/> 
              <EditButton onClick={saveFlashcardBack}>Save</EditButton>
            </div>
          </div>)
          :
          (
          <div className="flashcard-container">
            <div className="flashcard-side">Back</div>
            <div className="ace-editor-in-flashcard">
              <FixedAceEditor 
                msg={newFlashcardBack} 
                language={flashcard.language}
                height={'95px'}
                width={'300px'}/>
              <EditButton onClick={editFlashcardBack}>Edit</EditButton>
            </div>
          </div>) }
      </div>
    </div>
  )
};

export default OneFlashcardDetails;