import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './problem.css';
import Nav from '../Profile/LeftNav';

const ProblemPage = () => {
  const [problemData, setProblemData] = useState([]);

  useEffect(() => {
    // Fetch the problem data from the backend when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/problem');
      // Add the count property to each problem object and initialize it to 0
      const problemsWithCount = response.data.map((problem) => ({ ...problem, count: 0 }));
      setProblemData(problemsWithCount);
    } catch (error) {
      console.error('Failed to fetch problem data:', error.message);
    }
  };

  const incrementCount = (problemId) => {
    const updatedProblems = problemData.map((problem) => {
      if (problem.id === problemId) {
        return { ...problem, count: problem.count + 1 };
      }
      return problem;
    });

    setProblemData(updatedProblems);
  };

  // Render the problem data in the UI
  return (
    <div>
      {/* Navigation Bar */}
      <Nav/>
      {/* Problem Page */}
      <div className='problem-List'>
        <div className="problem-page">
          <h1>Problem List</h1>
        </div>
        <div className="problem-container">
          {problemData.length > 0 ? (
            problemData.map((problem, index) => (
              <div key={problem.id} className="problem-item">
                <span className="problem-number">{`Problem ${index + 1}: `}</span>
                <Link
                  to={`/problem/${problem.id}`}
                  onClick={() => incrementCount(problem.id)}
                  className="problem-name" // Apply the styles to the anchor tag directly
                >
                  {problem.name}
                </Link>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default ProblemPage;