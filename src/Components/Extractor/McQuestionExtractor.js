// import { useState, useEffect,useMemo } from "react";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./QuestionAnswerExtractor.css";
// import { toast } from "react-toastify";
// import SearchableDropdown from "../Dropdown/SearchableDropdown";


// function MCQExtractor(props) {
//   const { textField } = props;
//   const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
//   const [isDisabled, setIsDisabled] = useState(true);

//   const [dropdownValues, setDropdownValues] = useState([]);

//   const gradeOptions = useMemo(() => {
//     return ["1", "2", "3", "4", "5","6","7","8","9","10"];
//   }, []);

//   // Split the text field into individual question and answer pairs
//   const input = textField;

//   const questionAnswerPairs = input.split(/\n\n(?=[0-9Q])/).filter(Boolean);

//   const questionsAndAnswers = questionAnswerPairs.map((pair, index) => {
//     const [question, ...optionsAndAnswer] = pair.split(/\n{1,}/);

//     const options = optionsAndAnswer.slice(0, -1);
//     const answer = optionsAndAnswer[optionsAndAnswer.length - 1].replace(
//       /^Answer:\s*/,
//       ""
//     );

//     const category = dropdownValues[index]?.dropdown1;
//     const points = dropdownValues[index]?.dropdown2;

//     return {
//       question: question.trim(),
//       options: options.map((opt) => opt.trim()),
//       answer: answer.trim(),
//       dropdownValues: {
//         category,
//         points,
//       },
//     };
//   });

//   const handleCheckboxChange = (index) => {
//     const newCheckedCheckboxes = [...checkedCheckboxes];
//     newCheckedCheckboxes[index] = !newCheckedCheckboxes[index];
//     setCheckedCheckboxes(newCheckedCheckboxes);

//     if (newCheckedCheckboxes[index]) {
//       setDropdownValues((prevState) => {
//         const updatedValues = [...prevState];
//         updatedValues[index] = { dropdown1: "", dropdown2: "" };
//         return updatedValues;
//       });
//     } else {
//       setDropdownValues((prevState) => {
//         const updatedValues = [...prevState];
//         updatedValues.splice(index, 1);
//         return updatedValues;
//       });
//     }
//   };

//   const handleDropdown1Change = (event, index) => {
//     const selectedValue = event.target.value;
//     setDropdownValues((prevState) => {
//       const updatedValues = [...prevState];
//       updatedValues[index].dropdown1 = selectedValue;
//       return updatedValues;

      
//     });
//   };

//   const handleDropdown2Change = (event, index) => {
//     const selectedValue = event.target.value;
//     setDropdownValues((prevState) => {
//       const updatedValues = [...prevState];
//       updatedValues[index].dropdown2 = selectedValue;
//       return updatedValues;
//     });
//   };

//   useEffect(() => {
//     const anyChecked = checkedCheckboxes.some((checkbox) => checkbox === true);
//     setIsDisabled(!anyChecked);
//   }, [checkedCheckboxes]);

//   const filteredQuestionsAndAnswers = questionsAndAnswers.filter(
//     (qa, index) => checkedCheckboxes[index]
//   );


//   const handleConsoleLog = () => {
//     const hasIncompleteDropdowns = filteredQuestionsAndAnswers.some(
//       (qa) => !qa.dropdownValues.category || !qa.dropdownValues.points
//     );
//     if (props.selectedGame === "") {
//       props.toast("Please select a game");
//     } else if (hasIncompleteDropdowns) {
//       props.toast(
//         "Please select category and points for each checked question"
//       );
//     } else if(filteredQuestionsAndAnswers.length===0){
// props.toast("Please check question to copy to game.")
//     }

//      else {
//       toast.success("Question copied to game successfully", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//         });
//       console.log(filteredQuestionsAndAnswers);
      

//       filteredQuestionsAndAnswers.forEach((qa) => {
//         console.log(qa);
//       });
//     }
//   };

//   return (
//     <div className="answer">
//       {questionsAndAnswers.map((qa, index) => (
//         <div key={index} className="form-check">
//           <label
//             className="form-check-label"
//             htmlFor={`flexCheckDefault-${index}`}
//           >
//             <input
//               className="form-check-input"
//               type="checkbox"
//               value=""
//               id={`flexCheckDefault-${index}`}
//               checked={checkedCheckboxes[index]}
//               onChange={() => handleCheckboxChange(index)}
//             />

//             <div key={index}>
//               {qa.question && <p className="question"> {qa.question}</p>}
//               {qa.options &&
//                 qa.options.map((option, optionIndex) => (
//                   <p className="options" key={`${index}-${optionIndex}`}>
//                     {option}
//                   </p>
//                 ))}
//               {qa.answer && <p className="answers"> Answer: {qa.answer}</p>}

//               {checkedCheckboxes[index] && (
//                 <div
//                   className={`dropdowns ${
//                     checkedCheckboxes[index] ? "show" : "hide"
//                   }`}
//                 >
//                                <SearchableDropdown options={gradeOptions} selectedOption={dropdownValues.dropdown1}   setSelectedOption={(option) => handleDropdown1Change(option, index)}
//  useStyle2={true} />

//                                <SearchableDropdown
//   options={['Points 100', 'Points 200', 'Points 300', 'Points 400', 'Points 500']}
//   selectedOption={dropdownValues[index]?.dropdown2 || ""}
//   setSelectedOption={(option) => handleDropdown2Change(option, index)}
//   useStyle2={checkedCheckboxes[index]}
//   className={`dropDown dropdown show`}
//   style={{ marginLeft: '2rem' }}
// />

//                 </div>
//               )}
//             </div>
//           </label>
//         </div>
//       ))}
//       <button
//         className={`copy-button ${isDisabled ? "disabled" : "button"}`}
//         style={{ width: "6vw" }}
//         onClick={handleConsoleLog}
//       >
//         Copy To Game
//       </button>
//     </div>
//   );
// }

// export default MCQExtractor;


import { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./QuestionAnswerExtractor.css";
import { toast } from "react-toastify";

function MCQExtractor(props) {
const { textField } = props;
const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
const [isDisabled, setIsDisabled] = useState(true);

const [dropdownValues, setDropdownValues] = useState([]);
// Split the text field into individual question and answer pairs
const input = textField;

const questionAnswerPairs = input.split(/\n\n(?=[0-9Q])/).filter(Boolean);

const questionsAndAnswers = questionAnswerPairs.map((pair, index) => {
const [question, ...optionsAndAnswer] = pair.split(/\n{1,}/);

const options = optionsAndAnswer.slice(0, -1);
const answer = optionsAndAnswer[optionsAndAnswer.length - 1].replace(
/^Answer:\s*/,
""
);

const category = dropdownValues[index]?.dropdown1;
const points = dropdownValues[index]?.dropdown2;

return {
question: question.trim(),
options: options.map((opt) => opt.trim()),
answer: answer.trim(),
dropdownValues: {
category,
points,
},
};
});

const handleCheckboxChange = (index) => {
const newCheckedCheckboxes = [...checkedCheckboxes];
newCheckedCheckboxes[index] = !newCheckedCheckboxes[index];
setCheckedCheckboxes(newCheckedCheckboxes);

if (newCheckedCheckboxes[index]) {
setDropdownValues((prevState) => {
const updatedValues = [...prevState];
updatedValues[index] = { dropdown1: "", dropdown2: "" };
return updatedValues;
});
} else {
setDropdownValues((prevState) => {
const updatedValues = [...prevState];
updatedValues.splice(index, 1);
return updatedValues;
});
}
};

const handleDropdown1Change = (event, index) => {
const selectedValue = event.target.value;
setDropdownValues((prevState) => {
const updatedValues = [...prevState];
updatedValues[index].dropdown1 = selectedValue;
return updatedValues;
});
};

const handleDropdown2Change = (event, index) => {
const selectedValue = event.target.value;
setDropdownValues((prevState) => {
const updatedValues = [...prevState];
updatedValues[index].dropdown2 = selectedValue;
return updatedValues;
});
};

useEffect(() => {
const anyChecked = checkedCheckboxes.some((checkbox) => checkbox === true);
setIsDisabled(!anyChecked);
}, [checkedCheckboxes]);

const filteredQuestionsAndAnswers = questionsAndAnswers.filter(
(qa, index) => checkedCheckboxes[index]
);


const handleConsoleLog = () => {
const hasIncompleteDropdowns = filteredQuestionsAndAnswers.some(
(qa) => !qa.dropdownValues.category || !qa.dropdownValues.points
);
if (props.selectedGame === "") {
props.toast("Please select a game");
} else if (hasIncompleteDropdowns) {
props.toast(
"Please select category and points for each checked question"
);
} else if(filteredQuestionsAndAnswers.length===0){
props.toast("Please check question to copy to game.")
}

else {
toast.success("Question copied to game successfully", {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
});
console.log(filteredQuestionsAndAnswers);

filteredQuestionsAndAnswers.forEach((qa) => {
console.log(qa);
});
}
};

return (
<div className="answer">
{questionsAndAnswers.map((qa, index) => (
<div key={index} className="form-check">
<label
className="form-check-label"
htmlFor={`flexCheckDefault-${index}`}
>
<input
className="form-check-input"
type="checkbox"
value=""
id={`flexCheckDefault-${index}`}
checked={checkedCheckboxes[index]}
onChange={() => handleCheckboxChange(index)}
/>

<div key={index}>
{qa.question && <p className="question"> {qa.question}</p>}
{qa.options &&
qa.options.map((option, optionIndex) => (
<p className="options" key={`${index}-${optionIndex}`}>
{option}
</p>
))}
{qa.answer && <p className="answers"> Answer: {qa.answer}</p>}

{checkedCheckboxes[index] && (
<div
className={`dropdowns ${
checkedCheckboxes[index] ? "show" : "hide"
}`}
>
<select
onChange={(event) => handleDropdown1Change(event, index)}
value={dropdownValues[index]?.dropdown1 || ""}
className={`dropDown dropdown ${
checkedCheckboxes[index] ? "show" : ""
}`}
>
<option value="" disabled selected>
Category
</option>
<option value="Category 1">Category 1</option>
<option value="Category 2"> Category 2</option>
<option value="Category 3">Category 3</option>
<option value="Category 4">Category 4</option>
<option value="Category 5">Category 5</option>
<option value="Category 6">Category 6</option>
</select>
<select
onChange={(event) => handleDropdown2Change(event, index)}
value={dropdownValues[index]?.dropdown2 || ""}
className={`dropDown dropdown ${
checkedCheckboxes[index] ? "show" : ""
}`}
style={{ marginLeft: "2rem" }}
>
<option value="" disabled selected>
Points
</option>
<option value="Points 100">Points 100</option>
<option value="Points 200">Points 200</option>
<option value="Points 300">Points 300</option>
<option value="Points 400">Points 400</option>
<option value="Points 500">Points 500</option>
</select>
</div>
)}
</div>
</label>
</div>
))}
<button
className={`copy-button ${isDisabled ? "disabled" : "button"}`}
style={{ width: "6vw" }}
onClick={handleConsoleLog}
>
Copy To Game
</button>
</div>
);
}

export default MCQExtractor;