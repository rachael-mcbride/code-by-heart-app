import './one-flashcard-details.styles.scss'
import { useState, useEffect } from 'react';
import FixedAceEditor from '../ace-editor/fixed-ace-editor.component';

const OneFlashcardDetails = ({ flashcard }) => {
  let shortenedFront = flashcard.front.slice(0, 46);
  if (shortenedFront.length < flashcard.front.length) {
    shortenedFront = shortenedFront + "..."
  }

  let shortenedBack = flashcard.back.slice(0, 47);
  if (shortenedBack.length < flashcard.back.length) {
    shortenedBack = shortenedBack + "..."
  }

  const reviewDate = flashcard.date_to_review.slice(0, 22);

  const firstLetterOfLanguage = flashcard.language.slice(0, 1).toUpperCase();
  const restOfLanguage = flashcard.language.slice(1, flashcard.language.length);
  const language = firstLetterOfLanguage + restOfLanguage;


  return(
    <div className="one-flashcard-container">
      <div className="flashcard-details">
        {/* <div className="flashcard-text">
          <b>Front</b>: <i>{shortenedFront}</i>
        </div>
        <div className="flashcard-text"><b>Back</b>: <i>{shortenedBack}</i></div> */}
        <div className="flashcard-details-title">Details</div>
        <div className="flashcard-text"></div>
        <div className="flashcard-text"><b>Language</b>: {language}</div>
        <div className="flashcard-text"><b>Up for review on</b>: {reviewDate}</div>
        <div className="flashcard-text"></div>
        <div className="flashcard-text"><b>Previous times reviewed</b>: 0</div>
        <div className="flashcard-text"><b>Last marked</b> level <b>on</b> date</div>
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