import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./QuestionAnswerExtractor.css";

function TextExtractor(props) {
  const { textField } = props;
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  // Split the text field into individual question and answer pairs
  const pairs = textField
    .split(/\n(?=\d+\.|Q:|Q.|\bQ\d+\b)/)
    .filter((item) => item.trim() !== "");

  // Map each pair to a question and answer object
  const questionsAndAnswers = pairs.map((pair) => {
    const [question, ...answerParts] = pair.split(
      /\n?\(?(?:Answer:|\[A\d+\]|A\d+:|\(A\):|\(A\)|\bA\d+\b|A:|A\.|(__\S+__)|\[A\]:|\[A\]|\[Answer\])(?!\))(?:\)?|\n)/
    );
    // const [question, ...answerParts] = pair.split(/\n|(?:Answer:|\(A\):|\(A\)|A:|A\.|(__\S+__)|\[A\]:|\[A\]|\[Answer\]:|\[Answer\]|\nA\d+\.\s+)/);
    const answer = answerParts.join("").trim();
    if (question) {
      return {
        question: question.trim(),
        answer: answer,
        checked: false,
      };
    }
    // if the question is undefined, return an empty object
    return {};
  });
  const handleCheckboxChange = (index) => {
    const newCheckedCheckboxes = [...checkedCheckboxes];
    newCheckedCheckboxes[index] = !newCheckedCheckboxes[index];
    setCheckedCheckboxes(newCheckedCheckboxes);
  };
  const filteredQuestionsAndAnswers = questionsAndAnswers.filter(
    (qa, index) => checkedCheckboxes[index]
  );
  const handleConsoleLog = () => {
    filteredQuestionsAndAnswers.forEach((qa) => {
      console.log(`Question: ${qa.question}`);
      console.log(`Answer: ${qa.answer}`);
    });
  };

  return (
    <div className="answer">
      {questionsAndAnswers.map((qa, index) => (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id={`flexCheckDefault-${index}`}
            checked={checkedCheckboxes[index]}
            onChange={() => handleCheckboxChange(index)}
          />
          <label
            className="form-check-label"
            htmlFor={`flexCheckDefault-${index}`}
          >
            <div key={index}>
              {qa.question && <p className="question"> {qa.question}</p>}
              {qa.answer && <p className="answers"> {qa.answer}</p>}
            </div>
          </label>
        </div>
      ))}
       <button className="button" style={{width:"6vw"}} onClick={handleConsoleLog}>Copy</button>
    </div>
  );
}

export default TextExtractor;



// import React, { useState } from 'react';
// import './App.css';

// function TextExtractor(props) {
//   const { textField } = props;
//   const [copiedIndex, setCopiedIndex] = useState(-1);

//   const pairs = textField.split(/\n(?=\d+\.|[Qq]uestion:)/).filter((item) => item.trim() !== '');

//   const questionsAndAnswers = pairs.map((pair) => {
//     const [question, answer] = pair.split(/Answer:|\(A\):|\(A\)|A:|A\.|\[A\]:|\[A\]|\[Answer\]:|\[Answer\]|\nA\d+\.\s+|[Qq]uestion:\s*/);
//     if (question && answer) {
//       return {
//         question: question.trim(),
//         answer: answer.trim(),
//       };
//     }
//     // if the question or answer is undefined, return an empty object
//     return { question: question.trim(), answer: null };
//   });

//   const handleCopyClick = (text, index) => {
//     navigator.clipboard.writeText(text);
//     setCopiedIndex(index);
//   };

//   return (
//     <div className="answer">
//       {questionsAndAnswers.map((qa, index) => (
//         <div key={index} className="form-check">
//           <input
//             className="form-check-input"
//             type="checkbox"
//             value=""
//             id={`flexCheckDefault-${index}`}
//           />
//           <label className="form-check-label" htmlFor={`flexCheckDefault-${index}`}>
//             <div key={index}>
//               {qa.question && (
//                 <p className="question">
//                   {qa.question}
//                   {copiedIndex === index && <span className="copied-text">Copied!</span>}
//                   <button
//                     className="btn btn-sm btn-outline-secondary copy-button"
//                     onClick={() => handleCopyClick(qa.question, index)}
//                   >
//                     Copy
//                   </button>
//                 </p>
//               )}
//               {qa.answer && (
//                 <p className="answers">
//                   {qa.answer}
//                   {copiedIndex === index && <span className="copied-text">Copied!</span>}
//                   <button
//                     className="btn btn-sm btn-outline-secondary copy-button"
//                     onClick={() => handleCopyClick(qa.answer, index)}
//                   >
//                     Copy
//                   </button>
//                 </p>
//               )}
//             </div>
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TextExtractor;
