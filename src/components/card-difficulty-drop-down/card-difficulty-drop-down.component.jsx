import React from 'react';
import './card-difficulty-drop-down.styles.scss';

const CardDifficultyDropDown = ({ difficultyLevel, handleDifficultyChange } ) => {
  return (
  <select name="card-difficulty-drop-down" 
    className="card-difficulty-drop-down-menu"
    value={difficultyLevel} 
    onChange={event => handleDifficultyChange(event.target.value)}>
    <option className="language-item" id="0">Very Easy</option>
    <option className="language-item" id="1">Easy</option>
    <option className="language-item" id="2">Medium</option>
    <option className="language-item" id="3">Hard</option>
    <option className="language-item" id="4">Too hard/review again!</option>
  </select>
  )
}

export default CardDifficultyDropDown;