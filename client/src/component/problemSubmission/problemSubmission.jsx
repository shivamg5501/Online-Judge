import React, { useEffect, useState,useCallback } from 'react';
import axios from 'axios';

const ProblemSubmissionCode = ({ id }) => {
  const [outputData, setOutputData] = useState('');
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/problem/submission/${id}`);
      console.log(response.data);
      setOutputData(response.data.outputData);
    } catch (error) {
      console.error('Failed to fetch problem data:', error.message);
    }
  }, [id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="submission-container">
      <h1>Problem Submission</h1>
      <div className="file-content">
        <pre>{outputData}</pre>
      </div>
    </div>
  );
};

export default ProblemSubmissionCode;
