import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './problemSubmission.css'; // Import the CSS file

const ProblemSubmission = () => {
  const { id } = useParams();
  const [submissionData, setSubmissionData] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/problem/${id}/submission`);
      setSubmissionData(response.data);
      console.log('Fetched data:', response.data);
    } catch (error) {
      console.error('Failed to fetch problem data:', error.message);
    }
  };
    fetchData();
  }, []);
  return (
    <div className="problem-submission">
      <h2>Submission Details</h2>
      <div>
      {submissionData.length > 0 ? (
          submissionData.map((problem) => (
            <div key={problem._id} className="problem-item">
              <Link to={`/problem/submission/${problem._id}`}>{problem._id}</Link>
              {/* <div>{problem._id}</div> */}
              <div>{problem.status}</div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProblemSubmission;
