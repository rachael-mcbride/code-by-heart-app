import axios from 'axios';
import { useState, useEffect } from 'react';
import FixedAceEditor from '../ace-editor/fixed-ace-editor.component';
import EditableAceEditor from '../ace-editor/editable-ace-editor.component';
import CustomButton from '../custom-button/custom-button.component';

import './one-flashcard-details.styles.scss'

const OneFlashcardDetails = ({ flashcard }) => {
  // attributes to display in card details box 
  const reviewDate = flashcard.date_to_review.slice(0, 22);
  const firstLetterOfLanguage = flashcard.language.slice(0, 1).toUpperCase();
  const restOfLanguage = flashcard.language.slice(1, flashcard.language.length);
  const language = firstLetterOfLanguage + restOfLanguage;
  const timesReviewed = flashcard.total_times_reviewed;
  let historyMessage = false;
  if (flashcard.most_recent_difficulty_level !== null) {
    historyMessage = true;
  } 

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

  // useEffects to make sure button clicks take hold immediately
  useEffect(() => {
    setEditButtonFrontClicked(editButtonFrontClicked);
  }, [editButtonFrontClicked]);

  useEffect(() => {
    setEditButtonBackClicked(editButtonBackClicked);
  }, [editButtonBackClicked]);


  return(
    <div className="one-flashcard-container">
      <div className="flashcard-details">
        {/* <div className="flashcard-text">
          <b>Front</b>: <i>{shortenedFront}</i>
        </div>
        <div className="flashcard-text"><b>Back</b>: <i>{shortenedBack}</i></div> */}
        <div className="flashcard-details-title">Card Details</div>
        <div className="flashcard-text"><b>Language</b>: {language}</div>
        <div className="flashcard-text"><b>Up for review on</b>: {reviewDate}</div>
        <div className="flashcard-text"><b>Previous times reviewed</b>: {timesReviewed}</div>
        <div className="flashcard-text"> </div>
        <div className="flashcard-text"> </div>
        { historyMessage && 
          <div className="flashcard-text">
            <b>Last marked</b> <i>"{flashcard.most_recent_difficulty_level}"</i> <b>on</b>:
          </div> }
        { historyMessage && 
          <div className="flashcard-text">
            <div>{flashcard.most_recent_review_date.slice(0, 16)}</div>
          </div> }
      </div>

      <div>
      {/* CONDITIONALLY RENDERS FLASHCARD FRONT DEPENDING ON IF IT'S BEING EDITED OR NOT */}
      {editButtonFrontClicked && 
      // <div className="flashcard-front">
        <div>
        <div className="flashcard-number">Front</div>
          <div className="ace-editor-in-flashcard">
            <EditableAceEditor 
              placeholderText={"Click \"save\" when you are done editing."} 
              code={newFlashcardFront}
              language={"python"}
              updateCode={updateCardFront}
              height={'100px'}
              width={'280px'}/> 
            <CustomButton onClick={saveFlashcardFront}>Save</CustomButton>
          </div>
        </div>
      }
      {!editButtonFrontClicked && 
        <div>

        <div className="flashcard-number">Front</div>
            <div className="ace-editor-in-flashcard">
              <FixedAceEditor 
                msg={newFlashcardFront} 
                language={flashcard.language}
                height={'100px'}
                width={'280px'}/>
              <CustomButton onClick={editFlashcardFront}>Edit</CustomButton>
            </div>
        </div>
      }
      </div>
    
      <div className="flashcard-front">
        <div className="flashcard-number">Back</div>
        <div className="ace-editor-in-flashcard">
          <FixedAceEditor 
          msg={flashcard.back} 
          language={flashcard.language}
          height={'100px'}
          width={'280px'}/>
          <CustomButton onClick={editFlashcardBack}>Edit</CustomButton>
        </div>
      </div>
    </div>
  )
};

export default OneFlashcardDetails;