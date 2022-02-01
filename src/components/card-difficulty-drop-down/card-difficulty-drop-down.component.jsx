// import React from 'react';
import './card-difficulty-drop-down.styles.scss';

// const CardDifficultyDropDown = ({ difficultyLevel, handleDifficultyChange } ) => {
//   return (
//   <select name="card-difficulty-drop-down" 
//     className="card-difficulty-drop-down-menu"
//     value={difficultyLevel} 
//     onChange={event => handleDifficultyChange(event.target.value)}>
//     <option className="language-item" id="0">Very Easy</option>
//     <option className="language-item" id="1">Easy</option>
//     <option className="language-item" id="2">Medium</option>
//     <option className="language-item" id="3">Hard</option>
//     <option className="language-item" id="4">Review again!</option>
//   </select>
//   )
// }


import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const customStyles = {
  option: (state) => ({
    color: state.isSelected ? '#DC143C' : 'black',
    fontSize: 14,
    padding: 5,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 150,
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

const CardDifficultyDropDown = ({ difficultyLevel, handleDifficultyChange }) => {
  const [selectedOption, setSelectedOption] = useState({value: 'Very Easy', label: 'Very Easy'});
  const options = [
  { value: 'Very Easy', label: 'Very Easy' },
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' }, 
  { value: 'Hard', label: 'Hard' }, 
  { value: 'Review again!', label: 'Review again!' }, 
  ];

  useEffect(() => {
    handleDifficultyChange(selectedOption);
  }, [selectedOption])

  return (
    <div className="App">
      <Select 
        menuPlacement = {"top"}
        defaultValue={"Select..."}
        menuPlacement="top"
        onChange={setSelectedOption}
        options={options}
        // menuIsOpen={true}
        styles={customStyles}
        width='100px'
        // menuPosition="top"
      />
    </div>
  );
};

export default CardDifficultyDropDown;

