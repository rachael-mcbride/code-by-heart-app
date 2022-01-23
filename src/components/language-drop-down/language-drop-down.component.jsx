import React from 'react';

const LanguageDropDown = ({ language, handleLanguageChange } ) => {
  return (
  <select name="category" 
    className="language-drop-down"
    value={language} 
    onChange={event => handleLanguageChange(event.target.value)}>
    <option id="0">Markdown</option>
    <option id="1">Python</option>
    <option id="2">JavaScript</option>
    <option id="3">Java</option>
  </select>
  )
}

export default LanguageDropDown;