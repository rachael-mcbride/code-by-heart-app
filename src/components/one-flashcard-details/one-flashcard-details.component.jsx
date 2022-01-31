import './one-flashcard-details.styles.scss'
import { useState, useEffect } from 'react';
import FixedAceEditor from '../ace-editor/fixed-ace-editor.component';

const OneFlashcardDetails = ({ flashcard }) => {
  const reviewDate = flashcard.date_to_review.slice(0, 22);
  const firstLetterOfLanguage = flashcard.language.slice(0, 1).toUpperCase();
  const restOfLanguage = flashcard.language.slice(1, flashcard.language.length);
  const language = firstLetterOfLanguage + restOfLanguage;
  const timesReviewed = flashcard.total_times_reviewed;

  let historyMessage = false;
  if (flashcard.most_recent_difficulty_level !== null) {
    historyMessage = true;
  } 

  console.log(flashcard)

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
      <div className="flashcard-front">
        <div className="flashcard-number">Front</div>
        <div className="ace-editor-in-flashcard">
          <FixedAceEditor 
            msg={flashcard.front} 
            language={flashcard.language}
            height={'100px'}
            width={'280px'}/>
        </div>
      </div>
      <div className="flashcard-front">
        <div className="flashcard-number">Back</div>
        <div className="ace-editor-in-flashcard">
          <FixedAceEditor 
          msg={flashcard.back} 
          language={flashcard.language}
          height={'100px'}
          width={'280px'}/>
        </div>
      </div>
    </div>
  )
};

export default OneFlashcardDetails;