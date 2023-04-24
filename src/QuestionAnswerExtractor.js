function TextExtractor(props) {
  const { textField } = props;

  // Split the text field into individual question and answer pairs
  const pairs = textField
  .split(/\n(?=\d+\.|Q:|Q.|\bQ\d+\b)/)
    .filter((item) => item.trim() !== "");

  // Map each pair to a question and answer object
  const questionsAndAnswers = pairs.map((pair) => {
    const [question, ...answerParts] = pair.split(/\n?\(?(?:Answer:|\[A\d+\]|A\d+:|\(A\):|\(A\)|A:|A\.|(__\S+__)|\[A\]:|\[A\]|\[Answer\])(?!\))(?:\)?|\n)/);
    // const [question, ...answerParts] = pair.split(/\n|(?:Answer:|\(A\):|\(A\)|A:|A\.|(__\S+__)|\[A\]:|\[A\]|\[Answer\]:|\[Answer\]|\nA\d+\.\s+)/);
    const answer = answerParts.join("").trim();
    if (question) {
      return {
        question: question.trim(),
        answer: answer,
      };
    }
    // if the question is undefined, return an empty object
    return {};
  });

  return (
    <div className="answer">
      {questionsAndAnswers.map((qa, index) => (
        <div key={index}>
          {qa.question && <h6>Question: {qa.question}</h6>}
          {qa.answer && <p>Answer: {qa.answer}</p>}
        </div>
      ))}
    </div>
  );
}

// import React from 'react';
// import "./App.css";

// function TextExtractor(props) {
//   const { textField } = props;

//   // const pairs = textField.split(/\n(?=\d+\.)/).filter(item => item.trim() !== '');
//   const pairs = textField.split(/\n(?=[Q]?\d+)/).filter(item => item.trim() !== '');
//   // const pairs = textField.split(/\n(?=(?:Q(?:uestion)?\s*\d+|\d+|(?:Q)?\bQ?\b))/i).filter(item => item.trim() !== '');

//   const questionsAndAnswers = pairs.map(pair => {
//     const [question, answer] = pair.split(/Answer:|\(A\):|\(A\)|A:|A\.|(__\S+__)|\[A\]:|\[A\]|\[Answer\]:|\[Answer\]|\nA\d+\.\s+/);
//     // const [question, answer] = pair.match(/^(Q(?:uestion)?\s*\d+|Q|\d+)\.?\s+(.*)\s+(?:Answer:|\(A\):|\[A\]:|\[Answer\]:)\s*(.*)$/i) || [];
//     if (question && answer) {
//       return {
//         question: question.trim(),
//         answer: answer.trim()
//       };
//     }
//     // if the question or answer is undefined, return an empty object
//     return { question: question.trim(), answer: null };
//   });

//   return (
//     <div className="answer">
//       {questionsAndAnswers.map((qa, index) => (
//         <div key={index} >
//           <h6>Question: {qa.question}</h6>
//           {qa.answer && <p>Answer: {qa.answer}</p>}
//         </div>
//       ))}
//     </div>
//   );
// }

export default TextExtractor;

// import { useState, useEffect } from 'react';

// const TextExtractor = (props) => {
//   console.log("hello")
//   const { textField } = props;
//   const [checkedItems, setCheckedItems] = useState({});
//   const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);

//   const handleCheckboxChange = (event, index) => {
//     setCheckedItems({
//       ...checkedItems,
//       [index]: event.target.checked,
//     });
//     console.log("checkedItems: ", checkedItems);
//   };

//   const generateQuestionsAndAnswers = () => {
//     const lines = textField.split(/\r?\n/);
//     const questionsAndAnswers = [];

//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim();

//       if (line.startsWith('Q:')) {
//         const question = line.substr(2).trim();
//         const answerLines = [];

//         // Look for lines that start with "A:" or "Answer:"
//         for (let j = i + 1; j < lines.length; j++) {
//           const answerLine = lines[j].trim();

//           if (answerLine.startsWith('A:')) {
//             answerLines.push(answerLine.substr(2).trim());
//           } else if (answerLine.startsWith('Answer:')) {
//             answerLines.push(answerLine.substr(7).trim());
//           } else {
//             break;
//           }
//         }

//         const answer = answerLines.length > 0 ? answerLines.join('\n').trim() : '';
//         questionsAndAnswers.push({ question, answer });
//       }
//     }

//     setQuestionsAndAnswers(questionsAndAnswers);
//   };

//   useEffect(() => {
//     generateQuestionsAndAnswers();
//   }, [textField]);

//   return (
//     <div>
//       {questionsAndAnswers.map((item, index) => (
//         <div key={index}>
//           <input
//             type="checkbox"
//             checked={checkedItems[index] || false}
//             onChange={(event) => handleCheckboxChange(event, index)}
//           />
//           <div>{item.question}</div>
//           <div>{item.answer}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TextExtractor;
