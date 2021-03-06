import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CustomAceEditor from '../ace-editor/ace-editor.component';

import './one-flashcard-details.styles.scss'

const OneFlashcardDetails = ({ flashcard }) => {
  // formats the language attribute that gets displayed in "card details" box 
  const firstLetterOfLanguage = flashcard.language.slice(0, 1).toUpperCase();
  const restOfLanguage = flashcard.language.slice(1, flashcard.language.length);
  let language = firstLetterOfLanguage + restOfLanguage;
  const specialLangCases = {
    "Nodejs" : "JavaScript",
    "Csharp" : "C#",
    "Objc" : "Objective C",
    "Php" : "PHP"
  }
  language = (language in specialLangCases) ? specialLangCases[language] : language;

  // other attributes to display in "card details" box 
  const reviewDate = String(new Date(flashcard.date_to_review)).slice(0, 21);
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
      .put(`${process.env.REACT_APP_BACKEND_URL}/flashcards/${flashcard.id}`, newData)
      .then((response) => {
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
  };

  const saveFlashcardBack = () => {
    const newData = { "back" : newFlashcardBack };
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/flashcards/${flashcard.id}`, newData)
      .then((response) => {
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

    {/* CARD FRONT  */}
    {/* renders fixed or editable area based on 'editButtonFrontClicked' state */}
      <div>
        { editButtonFrontClicked ? (
          <div className="flashcard-container">
            <div className="flashcard-side">Front</div>
            <div className="ace-editor-in-flashcard">
              <CustomAceEditor 
                placeholderText={"Click \"save\" when you are done editing."} 
                code={newFlashcardFront}
                language={flashcard.language}
                updateCode={updateCardFront}
                readOnly={false}
                theme={"github"}
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
              <CustomAceEditor 
                code={newFlashcardFront} 
                language={flashcard.language}
                placeholderText={""} 
                theme={"github"}
                showLineNums={false}
                readOnly={true}
                height={'95px'}
                width={'300px'}/>
              <EditButton onClick={editFlashcardFront}>Edit</EditButton>
            </div>
          </div>) }
      </div>

    {/* CARD BACK  */}
    {/* renders fixed or editable area based on 'editButtonBackClicked' state */}
      <div>
        { editButtonBackClicked ? (
          <div className="flashcard-container">
            <div className="flashcard-side">Back</div>
            <div className="ace-editor-in-flashcard">
              <CustomAceEditor 
                placeholderText={"Click \"save\" when you are done editing."} 
                theme={"github"}
                code={newFlashcardBack}
                language={flashcard.language}
                updateCode={updateCardBack}
                showLineNums={false}
                readOnly={false}
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
              <CustomAceEditor 
                code={newFlashcardBack} 
                placeholderText={""} 
                language={flashcard.language}
                showLineNums={false}
                readOnly={true}
                theme={"github"}
                height={'95px'}
                width={'300px'}/>
              <EditButton onClick={editFlashcardBack}>Edit</EditButton>
            </div>
          </div>) }
      </div>
    </div>
  )
};

OneFlashcardDetails.propTypes = {
  flashcard: PropTypes.shape({
      back: PropTypes.string,
      date_to_review: PropTypes.string,
      deck_id: PropTypes.number,
      difficulty_level: PropTypes.number,
      front: PropTypes.string,
      id: PropTypes.number,
      interval: PropTypes.number,
      language: PropTypes.string,
      most_recent_difficulty_level: PropTypes.string,
      most_recent_review_date: PropTypes.string,
      previous_ease_factor: PropTypes.number,
      previous_repetitions: PropTypes.number,
      total_times_reviewed: PropTypes.number,
    })
};

export default OneFlashcardDetails;