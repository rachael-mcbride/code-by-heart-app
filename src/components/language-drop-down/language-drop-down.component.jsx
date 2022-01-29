import React from 'react';
import './language-drop-down.styles.scss'

const LanguageDropDown = ({ language, handleLanguageChange, includesMarkdown }) => {
  if (includesMarkdown) {
    return (
    <select name="language-drop-down" 
      className="language-drop-down-menu"
      value={language} 
      onChange={event => handleLanguageChange(event.target.value)}>
      <option className="language-item" id="0">Markdown</option>
      <option className="language-item" id="1">Python</option>
      <option className="language-item" id="2">Ruby</option>
      <option className="language-item" id="3">Golang</option>
    </select>
  )} else {
  return (
    <select name="language-drop-down" 
      className="language-drop-down-menu"
      value={language} 
      onChange={event => handleLanguageChange(event.target.value)}>
      <option className="language-item" id="1">Python</option>
      <option className="language-item" id="2">Ruby</option>
      <option className="language-item" id="3">Golang</option>
    </select>
  )};
};

// add in prop types 
// includesMarkdown = boolean; language = string; handleLanguageChange = func; 

export default LanguageDropDown;