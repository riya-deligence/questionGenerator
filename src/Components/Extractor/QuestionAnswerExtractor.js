import { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./QuestionAnswerExtractor.css";

function TextExtractor(props) {
  const { textField } = props;
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  // Split the text field into individual question and answer pairs

   const input = textField;

 


const questionAnswerPairs = input
.split(/\n(?=(?:\d+\)|\d+\.\s+|\bQ\d+))/)
.slice(1);
const questionsAndAnswers = questionAnswerPairs.map((pair) => {
  const [question, ...answerParts] = pair.split(
    /\n|(?:Answer:|\(A\):|\(A\)|A:|A\.|(__\S+__)|\[A\]:|\[A\]|\[Answer\]:|\[Answer\]|\nA\d+\.\s+)(?:\()(?!<)\s*/

   
    );    
    const answer = answerParts.join("").trim();
    return { question: question.trim(), answer: answer.trim() };
  });

// 
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
              {qa.answer && <p className="answers"> {qa.answer}</p>}
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

export default TextExtractor;
