// import React from 'react';
import './language-drop-down.styles.scss'

// const LanguageDropDown = ({ language, handleLanguageChange, includesMarkdown }) => {
//   if (includesMarkdown) {
//     return (
//     <div className="custom-select">
//       <select name="language-drop-down" 
//         className="language-drop-down-menu"
//         value={language} 
//         onChange={event => handleLanguageChange(event.target.value)}>
//         <option className="language-item" id="0">Markdown</option>
//         <option className="language-item" id="1">Python</option>
//         <option className="language-item" id="2">Ruby</option>
//         <option className="language-item" id="3">Golang</option>
//       </select>
//     </div>
//   )} else {
//   return (
//     <select name="language-drop-down" 
//       className="language-drop-down-menu"
//       value={language} 
//       onChange={event => handleLanguageChange(event.target.value)}>
//       <option className="language-item" id="1">Python</option>
//       <option className="language-item" id="2">Ruby</option>
//       <option className="language-item" id="3">Golang</option>
//     </select>
//   )};
// };

import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import { components } from 'react-select';

// const NoOptionsMessage = props => {
//   return (
//      <components.NoOptionsMessage {...props}>
//         Test…
//      </components.NoOptionsMessage>
//   );
// };

const LanguageDropDown = ({ language, handleLanguageChange, includesMarkdown }) => {
  const [selectedOption, setSelectedOption] = useState({value: 'python', label: 'Python'});

  const languageStyles = {
    option: (state) => ({
      color: state.isSelected ? '#DC143C' : 'black',
      fontSize: 14,
      padding: 11,
      // loadingMessage=false
    }),
    // {({inputValue}) => !inputValue ? noOptionsText : "No results found"},
    // noOptionsMessage: { inputValue: null },
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 100,
      fontSize: 14,
      fontFamily: 'Roboto Slab', 
      color: '#DC143C',
    }),
    singleValue: (provided, state) => {
      // const opacity = state.isDisabled ? 0.5 : 1;
      // const transition = 'opacity 300ms';
      return;
    }
  };

  const options = [
  { value: 'python', label: 'Python' },
  { value: 'go', label: 'Go' },
  { value: 'nodejs', label: 'JavaScript' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'objc', label: 'Objective C' },
  { value: 'ruby', label: 'Ruby' }, 
  { value: 'java', label: 'Java' },
  { value: 'scala', label: 'Scala' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'rust', label: 'Rust' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'racket', label: 'Racket' },
  { value: 'elixir', label: 'Elixir' },
  ];
  if (includesMarkdown) {
    options.unshift({ value: 'markdown', label: 'Markdown' })
  }

  const NoOptionsMessage = props => {
    return (
      <components.NoOptionsMessage {...props} className="custon-no-options-box">
        <span className="custom-no-options-msg"></span> 
      </components.NoOptionsMessage>
    );
  };

  useEffect(() => {
    handleLanguageChange(selectedOption.value);
  }, [selectedOption])

  return (
    <div className="lang-drop-down">
      <Select 
        loadingMessage={false}
        inputId={"search"}
        defaultValue={"python"}
        menuPlacement="auto"
        onChange={setSelectedOption}
        options={options}
        // menuIsOpen={true}
        styles={languageStyles}
        width='60px'
        components={{ NoOptionsMessage }}
      />
    </div>
  );
};

export default LanguageDropDown;