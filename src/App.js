import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import logo from "./logo/logo.png";
import Spinner from "./Spinner";
import MCQExtractor from "./McQuestionExtractor";
import TextExtractor from "./QuestionAnswerExtractor";
import { Slider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ToastContainer, toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.css";

import "react-toastify/dist/ReactToastify.css";
import GrowExample from "./loading";

function App() {
  const [question, setQuestion] = useState("");
  const [relevancy, setRelevancy] = useState(3);
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState(1);
  const [value, setValue] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [isFactile, setIsFactile] = useState(false);
  const [selectedOption, setSelectedOption] = useState("multiple choice");

  const changeValue = (event, value) => {
    setAnswer("");

    setValue(value);
  };
  const changeRelevancy = (event, value) => {
    setAnswer("");

    setRelevancy(value);
  };

  const handleChange = (event) => {
    setAnswer("");
    setQuestion(event.target.value);
  };
  const gradeChange = (e) => {
    setAnswer("");
        setGrade(e.target.value);
  };
  const onValueChange = (event) => {
    setAnswer("");
    setSelectedOption(event.target.value);
    if (event.target.value === "multiple choice") {
      setIsFactile(false);
    } else {
      setIsFactile(true);
    }
  };
  const notify = () =>
    toast.error("Please fill Topic/Subject field", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const muiTheme = createTheme({
    overrides: {
      MuiSlider: {
        thumb: {
          color: "#F1527E",
          height: 25,
          width: 25,
          marginTop: -8,
          marginLeft: -12,
        },
        track: {
          color: "#FBED55",
          height: 8,
          padding: 0,
          borderRadius: "25px",
        },
        rail: {
          color: "white",
          height: 8,
          borderRadius: "25px",
          padding: 0,
        },
      },
    },
  });
  const handleSubmit = async (event) => {
    setAnswer("")
    event.preventDefault();
    if (!question) {
      notify();
    } else {
      setIsLoading(true);
      // const prompt = `generate a question and answer for the following text: ${question}`;
      // const prompt = `${value} ${selectedOption} one liner questions and answers related to ${question} for grade ${grade}`;
      const prompt = `generate ${value}  ${selectedOption} questions with answer for ${grade} grade student on ${question}`;

      const apiKey = "your api key"
      const apiUrl = "https://api.openai.com/v1/completions";

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };
      let temperature = parseFloat((0.2 + relevancy / 10).toFixed(1));

      const data = {
        prompt,
        max_tokens: 500,
        model: "text-davinci-003",
        n: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        temperature: temperature,
        top_p: 1,
      };

      try {
        const response = await axios.post(apiUrl, data, { headers });
        // for (let i=0;i<=5;i++){
        //   console.log(response.data.choices[i].text)
        //   setAnswer(oldArray => [...oldArray, response.data.choices[i].text])

        // }

        setAnswer(response.data.choices[0].text);
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="header">
        <div className="navbar">
          <img src={logo} className="image" alt="factile_img" />
        </div>
      </div>
      <div className="main-div">
        <div className="first-div">
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: "2rem", marginLeft: "2rem" }}
          >
            <div className="box">
              <label className="heading">Topic/Subject</label>
              <input
                className="topic"
                type="text"
                value={question}
                onChange={handleChange}
              />
            </div>
           

            <div className="box">
              <label className="heading">Grade</label>
              <select onChange={gradeChange} className="dropDown">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="box">
              <label className="heading">Question Type</label>
              <div className="radio">
                <input
                  type="radio"
                  value="jeopardy"
                  checked={selectedOption === "jeopardy"}
                  onChange={onValueChange}
                />

                <label>Factile</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  value="multiple choice"
                  checked={selectedOption === "multiple choice"}
                  onChange={onValueChange}
                />

                <label>Choice</label>
              </div>
              {/* <div className="radio">
                <input
                  type="radio"
                  value="Hard"
                  checked={selectedOption === "Hard"}
                  onChange={onValueChange}
                />
               
                <label>Hard</label>
              </div> */}
            </div>
            <div className="box slider">
              <label className="heading">No. Of Question</label>
              <ThemeProvider theme={muiTheme}>
                {" "}
                <Slider
                  style={{ width: "24rem" }}
                  min={1}
                  max={10}
                  step={1}
                  defaultValue={4}
                  value={value}
                  onChange={changeValue}
                />
              </ThemeProvider>
              <div className="value">{value}</div>
            </div>
            <div className="box slider">
              <label className="heading">Relevancy</label>
              <ThemeProvider theme={muiTheme}>
                {" "}
                <Slider
                  style={{ width: "24rem" }}
                  min={1}
                  max={10}
                  step={1}
                  defaultValue={3}
                  value={relevancy}
                  onChange={changeRelevancy}
                />
              </ThemeProvider>

              <div className="value">{relevancy}</div>
            </div>

            <button type="submit" className="button">
              {isLoading ? <Spinner /> : "Generate"}
            </button>
          </form>
        </div>
        <div className={isLoading ? "spinner-container" : "second-div"}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          
          {isLoading && <GrowExample/>}
          
          {answer && isFactile && <TextExtractor textField={answer} />}
          {answer && !isFactile && <MCQExtractor textField={answer} />}

          {/* {answer && <div className="answer">{answer}</div>} */}
          {/* {answer && <div>{answer.map((ans)=><div>{ans}</div>)}</div>} */}
        </div>
      </div>
      <div className="footer">
        <p>Limited knowledge of world and events after 2021</p>
      </div>
    </>
  );
}

export default App;
