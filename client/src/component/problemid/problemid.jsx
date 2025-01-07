import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Nav from '../Profile/LeftNav';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './problemid.css';
const ProblemIdPage = () => {

  const { id } = useParams();
  const [problemData, setProblemData] = useState([]);
  const [inputTestcase, setInputTestcase] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [outputData, setOutputData] = useState('');
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/problem/${id}`,{
        headers: {
          'Authorization': `token ${token}`, // Changed to Bearer format
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      setProblemData(response.data);
    } catch (error) {
      console.error('Failed to fetch problem data:', error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handleInputTestcaseChange = (e) => {
    setInputTestcase(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you can send the language and code to the server for submission
    try {
      const response = await axios.post(`http://localhost:8000/problem/submit/${id}`, {
        language,
        code,
      });
      console.log('Submission response:', response.data);
      // Clear the form fields after successful submission
      setLanguage('');
      setCode('');
      // You may also want to show a success message to the user
      alert('Submission successful!');
    } catch (error) {
      console.error('Failed to submit the code:', error.message);
      // You may want to show an error message to the user
      alert('Submission failed!');
    }
  };
  const handleRun = async () => {
    // Here, you can send the language, code, and inputTestcase to the server for running the code
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      const response = await axios.post('http://localhost:8000/problem/run', {
        language,
        code,
        input: inputTestcase, // Send the inputTestcase as 'input' to the server
      },{
        headers: {
          'Authorization': `token ${token}`, // Changed to Bearer format
          'Content-Type': 'application/json'
        },
      });
      console.log('Run response1:', response.data);
      // const outputData = response.data;
      // console.log(typeof outputData);
    // Update the state with the output data
     setOutputData(response.data.outputData);
      // Handle the response from the server if needed
    } catch (error) {
      console.error('Failed to run the code:', error.message);
      // Show an error message to the user if needed
    }
  };

  const handleSubmissionButtonClick = () => {
    navigate(`/problem/${id}/submission`);
  };

  return (
    <>
      <Nav />
      {/* <div className='boxWrapper'> */}
      <div className="problem-id-page">
        {/* Problem details section */}
        <div className="problem-details">
          <div className="problem-description">
            <h2>{problemData.name}</h2>
            <p>{problemData.description}</p>
          </div>
          <h3>Test Cases:</h3>
          {problemData.testCases && problemData.testCases.length > 0 ? (
            problemData.testCases.map((testCase, index) => (
              <div key={index} className="test-case-container">
                <h4>Test Case {index + 1}:</h4>
                <div>
                  <strong>Input:</strong>
                  <pre>{testCase.input}</pre>
                </div>
                <div>
                  <strong>Expected Output:</strong>
                  <pre>{testCase.expectedOutput}</pre>
                </div>
              </div>
            ))
          ) : (
            <p>No test cases available for this problem.</p>
          )}
        </div>
        {/* </div> */}
        {/* Form for language and code submission */}
        <form className="submission-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="language">
              Language:
            </label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="custom-dropdown"
            >
              <option value="">Select a language</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">cpp</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="code">
              Code:
            </label>
            <textarea
              id="code"
              rows="10"
              value={code}
              onChange={handleCodeChange}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="inputTestcase">
             input:
            </label>
            <textarea
              id="inputTestcase"
              rows="3"
              value={inputTestcase}
              onChange={handleInputTestcaseChange}
            />
          </div>
          {/* Display the output in a separate div container */}
          {outputData && (
            <div className="output-container">
              <h3>Output:</h3>
              <pre>{outputData}</pre>
            </div>
          )}
          <button type="button" onClick={handleRun}>Run</button>
          <button type="submit">Submit</button>
          <button className="submission-button" onClick={handleSubmissionButtonClick}>
            My Submission
          </button>
        </form>
      </div>
    </>
  );
};

export default ProblemIdPage;