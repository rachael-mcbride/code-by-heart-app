import React from 'react';
import './language-drop-down.styles.scss'
const LanguageDropDown = ({ language, handleLanguageChange } ) => {
  return (
  <select name="language-drop-down" 
    className="language-drop-down-menu"
    value={language} 
    onChange={event => handleLanguageChange(event.target.value)}>
    <option className="language-item" id="0">Plain Text</option>
    <option className="language-item" id="1">Python</option>
    <option className="language-item" id="2">Ruby</option>
    <option className="language-item" id="4">Golang</option>
  </select>
  )
}

export default LanguageDropDown;