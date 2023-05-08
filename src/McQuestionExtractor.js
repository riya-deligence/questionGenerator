import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./QuestionAnswerExtractor.css";

function MCQExtractor(props) {
  const { textField } = props;
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  // Split the text field into individual question and answer pairs
  const input = textField;

  const questionAnswerPairs = input.split(/\n\n(?=[0-9Q])/).filter(Boolean);

  const questionsAndAnswers = questionAnswerPairs.map((pair) => {
    const [question, ...optionsAndAnswer] = pair.split(/\n{1,}/);

    const options = optionsAndAnswer.slice(0, -1);
    const answer = optionsAndAnswer[optionsAndAnswer.length - 1].replace(
      /^Answer:\s*/,
      ""
    );
    return {
      question: question.trim(),
      options: options.map((opt) => opt.trim()),
      answer: answer.trim(),
    };
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
    console.log(filteredQuestionsAndAnswers);

    filteredQuestionsAndAnswers.forEach((qa) => {
      console.log(qa);
    });
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
            </div>
          </label>
        </div>
      ))}
      <button
        className="button copy-button"
        style={{ width: "6vw" }}
        onClick={handleConsoleLog}
      >
        Copy
      </button>
    </div>
  );
}

export default MCQExtractor;

// import { useState } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./QuestionAnswerExtractor.css";

// function MCQExtractor(props) {
//   const { textField } = props;
//   const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

//   // Split the text field into individual question and answer pairs
//   const input = textField;
//   const questionAnswerPairs = input.split(/\n{2,}/).filter(Boolean);

//   const questionsAndAnswers = questionAnswerPairs.map((pair) => {
//     const [question, ...optionsAndAnswer] = pair.split(/\n(?=Answer:)/);
//     const options = optionsAndAnswer.slice(0, -1);
//     const answer = optionsAndAnswer[optionsAndAnswer.length - 1].replace(/^Answer:\s*/, "");
//     return { question: question.trim(), options: options.map((opt) => opt.trim()), answer: answer.trim() };
//   });

//   const handleCheckboxChange = (index) => {
//     const newCheckedCheckboxes = [...checkedCheckboxes];
//     newCheckedCheckboxes[index] = !newCheckedCheckboxes[index];
//     setCheckedCheckboxes(newCheckedCheckboxes);
//   };

//   const filteredQuestionsAndAnswers = questionsAndAnswers.filter(
//     (qa, index) => checkedCheckboxes[index]
//   );

//   const handleConsoleLog = () => {
//     console.log(filteredQuestionsAndAnswers);

//     filteredQuestionsAndAnswers.forEach((qa) => {
//       console.log(qa);
//     });
//   };

//   return (
//     <div className="answer">
//       {questionsAndAnswers.map((qa, index) => (
//         <div key={index} className="form-check">
//           <label className="form-check-label" htmlFor={`flexCheckDefault-${index}`}>
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
//             </div>
//           </label>
//         </div>
//       ))}
//       <button className="button copy-button" style={{ width: "6vw" }} onClick={handleConsoleLog}>
//         Copy
//       </button>
//     </div>
//   );
// }

// export default MCQExtractor;
