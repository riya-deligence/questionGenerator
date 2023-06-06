import React, { useState, useMemo } from "react";
import "./App.css";
import axios from "axios";
import logo from "./Image/logo.png";
import Spinner from "./Components/Spinners/CircleSpinner";
import MCQExtractor from "./Components/Extractor/McQuestionExtractor";
import TextExtractor from "./Components/Extractor/QuestionAnswerExtractor";
import { Slider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ToastContainer, toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.css";
import SearchableDropdown from "./Components/Dropdown/SearchableDropdown";
import "react-toastify/dist/ReactToastify.css";
import GrowExample from "./Components/Spinners/growSpinner";


function App() {
  const [question, setQuestion] = useState("");
  const [relevancy, setRelevancy] = useState(3);
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState(1);
  const [value, setValue] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [isFactile, setIsFactile] = useState(false);
  const [selectedOption, setSelectedOption] = useState("multiple choice");
  const [selectedGame, setSelectedGame] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredOptions, setFilteredOptions] = useState([]);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const dropdownRef = useRef(null);
  const subject = [
    "Mathematics",
    "English",
    "Physics",
    "Chemistry",
    "Accountancy",
    "Biology",
    "Science",
    "Computers",
    "Geography",
    "History",
    "Social studies",
    "Physical Education",
    "Arts",
    "Architecture",
    "Design",
    "Journalism",
    "Life skills",
    "Moral Science",
    "Philosophy",
    "Environmental studies",
    "Holi",
    "Diwali",
    "Economics",
    "Political Science",
    "World Language",
  ];
  const options = useMemo(() => {
    return ["Game 1", "Game 2", "Game 3", "Game 4", "Game 5"];
  }, []);
  const gradeOptions = useMemo(() => {
    return ["1", "2", "3", "4", "5","6","7","8","9","10"];
  }, []);
  const changeValue = (event, value) => {
    setValue(value);
  };
  const changeRelevancy = (event, value) => {
    setRelevancy(value);
  };

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };
  const onEnteredTerm = (event) => {
    setQuestion(event);
  };
  const gradeChange = (e) => {
    setGrade(e);
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
  const notify = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      zIndex: 10000,
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
    setAnswer("");
    event.preventDefault();
    if (!question) {
      notify("Please fill Topic/Subject field");
    } else {
      setIsLoading(true);
      // const prompt = `generate a question and answer for the following text: ${question}`;
      // const prompt = `${value} ${selectedOption} one liner questions and answers related to ${question} for grade ${grade}`;
      const prompt = `generate ${value}  ${selectedOption} questions with answer for ${grade} grade student on ${question}`;

      const apiKey = "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";
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

        setAnswer(response.data.choices[0].text);
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  //   setFilteredOptions(options);
  // }, [options]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // const handleInputChange = (event) => {
  //   const value = event.target.value;
  //   setSearchTerm(value);
  //   filterOptions(value);
  //   setIsDropdownOpen(true);
  // };

  // const handleOptionSelect = (option) => {
  //   setSelectedGame(option);
  //   setSearchTerm("");
  //   setFilteredOptions(options);
  //   setIsDropdownOpen(false);
  // };

  // const filterOptions = (searchTerm) => {
  //   const filteredOptions = options.filter((option) =>
  //     option.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredOptions(filteredOptions);
  // };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const handleGameUpdate = (updatedGame) => {
    setSelectedGame(updatedGame);
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
              <div className="subject-list">
                {subject
                  .filter((item) => {
                    const enteredTerm = question.toLowerCase();
                    const subject = item.toLowerCase();
                    return (
                      enteredTerm &&
                      subject.startsWith(enteredTerm) &&
                      subject !== enteredTerm
                    );
                  })
                  .map((item) => (
                    <div
                      onClick={() => onEnteredTerm(item)}
                      key={item}
                      className="subject-list-row"
                    >
                      {item}
                    </div>
                  ))}
              </div>
            </div>

            <div className="box">
              <label className="heading">Grade</label>
              {/* <select onChange={gradeChange} className="dropDown dropdown-select">
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
              </select> */}
              <SearchableDropdown options={gradeOptions} selectedOption={grade} setSelectedOption={gradeChange} useStyle2={true}/>
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

          {isLoading && <GrowExample />}
          {!isLoading && (
            <div style={{ marginTop: "2rem" }}>
                <SearchableDropdown options={options} selectedOption={selectedGame} useStyle2={false} setSelectedOption={handleGameUpdate}/>
              {/* <div className="DropDown" ref={dropdownRef}>
                <div className="dropdown-input-container">
                  <input
                    type="text"
                    className="dropdown-input"
                    value={selectedGame || searchTerm}
                    onChange={handleInputChange}
                    onClick={toggleDropdown}
                    placeholder="Select a game.."
                  />
                  <div className="dropdown-icon" onClick={toggleDropdown}>
                    <ExpandMoreIcon
                      className={`dropdown-icon ${
                        isDropdownOpen ? "up" : "down"
                      }`}
                    />
                  </div>
                </div>
                {isDropdownOpen && (
                  <ul
                    className="dropdown-list"
                    style={{ width: dropdownRef.current.offsetWidth }}
                  >
                    {searchTerm && filteredOptions.length === 0 ? (
                      <li className="no-options">No options found</li>
                    ) : (
                      filteredOptions.map((option, index) => (
                        <li
                          key={index}
                          className={`dropdown-item ${
                            option === selectedGame ? "selected" : ""
                          }`}
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div> */}
            </div>
          )}
          {/* <Dropdown options={options} style={{marginTop:"10rem"}} /> */}
          {answer && isFactile && (
            <TextExtractor
              textField={answer}
              toast={notify}
              selectedGame={selectedGame}
            />
          )}
          {answer && !isFactile && (
            <MCQExtractor
              textField={answer}
              toast={notify}
              selectedGame={selectedGame}
            />
          )}

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
