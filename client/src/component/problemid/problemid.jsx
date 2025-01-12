import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Send, Clock, FileCode, CheckCircle, XCircle } from "lucide-react";
import Nav from "../Profile/LeftNav";

const languageTemplates = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  python: `print("Hello, World!")`,
  javascript: `console.log("Hello, World!");`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
};

const ProblemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(languageTemplates.cpp);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  // Mock Problem Data
const mockProblemData = {
  id: "1",
  name: "Two Sum",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
  difficulty: "Easy",
  timeLimit: "1s",
  memoryLimit: "256MB",
  testCases: [
    {
      input: "nums = [2,7,11,15], target = 9",
      expectedOutput: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      expectedOutput: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      input: "nums = [3,3], target = 6",
      expectedOutput: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
    },
  ],
  submissions: [
    {
      status: "Accepted",
      timestamp: "2 minutes ago",
    },
    {
      status: "Wrong Answer",
      timestamp: "5 minutes ago",
    },
  ],
};

const token = localStorage.getItem("token");
  const fetchProblem = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/problem/${id}`, {
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProblem(response.data);
      // setProblem(mockProblemData);
    } catch (error) {
      console.error("Error fetching problem data:", error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchProblem();
  }, [fetchProblem]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(languageTemplates[newLang]);
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
     
      const response = await axios.post(
        "http://localhost:8000/problem/run",
        { language, code, input },
        {
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setOutput(response.data.outputData || "No output received.");
    } catch (error) {
      console.error("Error running code:", error.message);
      setOutput("Error while running code.");
    }
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    if(!token){
      navigate('/login');
    }
    else{
    setIsRunning(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/problem/submit/${id}`,
        { language, code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Code submitted successfully!");
    } catch (error) {
      console.error("Error submitting code:", error.message);
      alert("Submission failed.");
    }
    setIsRunning(false);
  }
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "description" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("submissions")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "submissions" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                Submissions
              </button>
            </div>

            {activeTab === "description" ? (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{problem.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                    {problem.difficulty}
                  </span>
                  <span className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {problem.timeLimit}
                  </span>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{problem.description}</p>
                </div>
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-4">Example Test Cases:</h2>
                  {problem.testCases.map((testCase, index) => (
                    <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="mb-2">
                        <span className="font-medium">Input: </span>
                        <code className="bg-gray-100 px-2 py-1 rounded">{testCase.input}</code>
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Output: </span>
                        <code className="bg-gray-100 px-2 py-1 rounded">{testCase.expectedOutput}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>Submission history will go here.</div>
            )}
          </div>

          {/* Code Editor Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isRunning}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit
                </button>
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 font-mono text-sm p-4 bg-gray-50 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-24 font-mono text-sm p-4 bg-gray-50 rounded-md border mt-4"
              placeholder="Enter your test input here..."
            />

            {output && (
              <pre className="w-full min-h-[100px] p-4 bg-gray-50 rounded-md border font-mono text-sm whitespace-pre-wrap mt-4">
                {output}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;
