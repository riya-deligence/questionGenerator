import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./QuestionAnswerExtractor.css";

function TextExtractor(props) {
  const { textField } = props;
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  // Split the text field into individual question and answer pairs
  // const input = "\n\n1.What is the product of the two prime numbers 11 and 13? Answer: 143\n\n2. How many sides does a nonagon have? Answer: Nine\n\n3. What is the product of the sides of a cube? Answer: 6\n\n4.What is the area of a triangle with a base of 10 inches and a height of 8 inches? Answer: 40 square inches \n\n5. What is the perimeter of a circle with a diameter of 20 inches? Answer: 125.66370614359172\n\n6. What is the ratio of the circumference to the diameter of a circle? Answer: π (about 3.14159)\n\n7. If you multiply the denominator and numerator of a fraction by the same number, what will happen to the value of the fraction? Answer: It will remain the same\n\n8. What is the general formula for a quadratic equation? Answer: ax2 + bx + c = 0\n\n9. What does the Greek letter “Π” represent in mathematics? Answer: The ratio of a circle's circumference to its diameter \n\n10. What is the function of a variable in an equation? Answer: It is used to represent an unknown value in an equation.";
  const input = textField;
  const questionAnswerPairs = input
    .split(/\n(?=(?:\d+\)|\d+\.\s+|\bQ\d+))/)
    .slice(1);
  // const questionAnswerPairs = input.split(/\n(?=\d+[\).\s]+Q:|Q.|\bQ\d+\b)/).slice(1);

  const questionsAndAnswers = questionAnswerPairs.map((pair) => {
    const [question, ...answerParts] = pair.split(
      /\n|(?:Answer:|\(A\):|\(A\)|A:|A\.|(__\S+__)|\[A\]:|\[A\]|\[Answer\]:|\[Answer\]|\nA\d+\.\s+)(?<!\()\s*/
    );
    const answer = answerParts.join("").trim();
    return { question: question.trim(), answer: answer.trim() };
  });

  // console.log(questionsAndAnswers);

  // const pairs = textField
  //   .split(/\n(?=\d+\.|Q:|Q.|\bQ\d+\b)/)
  //   .filter((item) => item.trim() !== "");

  // // Map each pair to a question and answer object
  // const questionsAndAnswers = pairs.map((pair) => {
  //   const [question, ...answerParts] = pair.split(
  //     // /\n?\(?(?:Answer:|\[A\d+\]|A\d+:|\(A\):|\(A\)|\bA\d+\b|A:|A\.|(__\S+__)|\[A\]:|\[A\]|\[Answer\])(?!\))(?:\)?|\n)/
  //     /\n|(?:Answer:|\(A\):|\(A\)|A:|A\.|(__\S+__)|\[A\]:|\[A\]|\[Answer\]:|\[Answer\]|\nA\d+\.\s+)(?<!\()\s*/

  //     );
  //   // const [question, ...answerParts] = pair.split(/\n|(?:Answer:|\(A\):|\(A\)|A:|A\.|(__\S+__)|\[A\]:|\[A\]|\[Answer\]:|\[Answer\]|\nA\d+\.\s+)/);
  //   const answer = answerParts.join("").trim();
  //   if (question) {
  //     return {
  //       question: question.trim(),
  //       answer: answer,
  //       checked: false,
  //     };
  //   }
  //   // if the question is undefined, return an empty object
  //   return {};
  // });
  const handleCheckboxChange = (index) => {
    const newCheckedCheckboxes = [...checkedCheckboxes];
    newCheckedCheckboxes[index] = !newCheckedCheckboxes[index];
    setCheckedCheckboxes(newCheckedCheckboxes);
  };
  const filteredQuestionsAndAnswers = questionsAndAnswers.filter(
    (qa, index) => checkedCheckboxes[index]
  );
  const handleConsoleLog = () => {
    console.log(filteredQuestionsAndAnswers)

    filteredQuestionsAndAnswers.forEach((qa) => {
      console.log(qa)
      // console.log(`Question: ${qa.question}`);
      // console.log(`Answer: ${qa.answer}`);
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
