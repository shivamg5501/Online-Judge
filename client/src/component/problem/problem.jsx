import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight, Tag, Clock, BarChart2 } from "lucide-react";
import axios from "axios";
import Nav from "../Profile/LeftNav";

const ProblemPage = () => {
  const [problemData, setProblemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const mockProblems = [
    {
      id: 1,
      name: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      timeLimit: "1s",
      successRate: "75%",
      description: "Find two numbers in an array that add up to a target",
    },
    {
      id: 2,
      name: "Longest Palindromic Substring",
      difficulty: "Medium",
      category: "Strings",
      timeLimit: "2s",
      successRate: "62%",
      description:
        "Find the longest substring that reads the same forwards and backwards",
    },
    {
      id: 3,
      name: "Binary Tree Maximum Path Sum",
      difficulty: "Hard",
      category: "Trees",
      timeLimit: "1.5s",
      successRate: "45%",
      description:
        "Find the path with maximum sum between any two nodes in a binary tree",
    },
    {
      id: 4,
      name: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stack",
      timeLimit: "1s",
      successRate: "80%",
      description:
        "Determine if the input string has valid parentheses ordering",
    },
    {
      id: 5,
      name: "LRU Cache",
      difficulty: "Medium",
      category: "Design",
      timeLimit: "1.5s",
      successRate: "55%",
      description: "Design and implement a Least Recently Used (LRU) cache",
    },
    {
      id: 6,
      name: "Merge K Sorted Lists",
      difficulty: "Hard",
      category: "Linked Lists",
      timeLimit: "2s",
      successRate: "42%",
      description: "Merge k sorted linked lists into one sorted list",
    },
    {
      id: 7,
      name: "Best Time to Buy and Sell Stock",
      difficulty: "Easy",
      category: "Arrays",
      timeLimit: "1s",
      successRate: "85%",
      description: "Find the maximum profit by buying and selling a stock once",
    },
    {
      id: 8,
      name: "3Sum",
      difficulty: "Medium",
      category: "Arrays",
      timeLimit: "1.5s",
      successRate: "58%",
      description: "Find all unique triplets that sum to zero",
    },
    {
      id: 9,
      name: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      category: "Arrays",
      timeLimit: "2s",
      successRate: "35%",
      description: "Find the median of two sorted arrays in logarithmic time",
    },
    {
      id: 10,
      name: "Valid Anagram",
      difficulty: "Easy",
      category: "Strings",
      timeLimit: "1s",
      successRate: "82%",
      description: "Determine if two strings are anagrams of each other",
    },
    {
      id: 11,
      name: "Course Schedule",
      difficulty: "Medium",
      category: "Graphs",
      timeLimit: "1.5s",
      successRate: "52%",
      description:
        "Determine if it is possible to finish all courses given prerequisites",
    },
    {
      id: 12,
      name: "Word Search II",
      difficulty: "Hard",
      category: "Trie",
      timeLimit: "2s",
      successRate: "38%",
      description:
        "Find all words in a board from a given dictionary using a trie",
    },
    {
      id: 13,
      name: "Maximum Subarray",
      difficulty: "Easy",
      category: "Arrays",
      timeLimit: "1s",
      successRate: "78%",
      description: "Find the contiguous subarray with the largest sum",
    },
    {
      id: 14,
      name: "Word Break",
      difficulty: "Medium",
      category: "DP",
      timeLimit: "1.5s",
      successRate: "54%",
      description:
        "Determine if a string can be segmented into dictionary words",
    },
    {
      id: 15,
      name: "N-Queens",
      difficulty: "Hard",
      category: "Backtracking",
      timeLimit: "2s",
      successRate: "40%",
      description: "Place N queens on an NxN chessboard without conflicts",
    },
    {
      id: 16,
      name: "Climbing Stairs",
      difficulty: "Easy",
      category: "DP",
      timeLimit: "1s",
      successRate: "83%",
      description:
        "Count the number of ways to climb n stairs taking 1 or 2 steps",
    },
    {
      id: 17,
      name: "Find All Anagrams",
      difficulty: "Medium",
      category: "Sliding Window",
      timeLimit: "1.5s",
      successRate: "56%",
      description:
        "Find all anagrams of a pattern in a string using sliding window",
    },
    {
      id: 18,
      name: "Serialize Binary Tree",
      difficulty: "Hard",
      category: "Trees",
      timeLimit: "2s",
      successRate: "41%",
      description: "Serialize and deserialize a binary tree",
    },
    {
      id: 19,
      name: "Symmetric Tree",
      difficulty: "Easy",
      category: "Trees",
      timeLimit: "1s",
      successRate: "79%",
      description: "Check if a binary tree is a mirror of itself",
    },
    {
      id: 20,
      name: "Rotate Array",
      difficulty: "Medium",
      category: "Arrays",
      timeLimit: "1.5s",
      successRate: "57%",
      description: "Rotate an array to the right by k steps",
    },
    {
      id: 21,
      name: "Regular Expression Matching",
      difficulty: "Hard",
      category: "DP",
      timeLimit: "2s",
      successRate: "37%",
      description: "Implement regular expression matching with . and *",
    },
    {
      id: 22,
      name: "Path Sum",
      difficulty: "Easy",
      category: "Trees",
      timeLimit: "1s",
      successRate: "81%",
      description: "Check if a binary tree has a path with given sum",
    },
    {
      id: 23,
      name: "Gas Station",
      difficulty: "Medium",
      category: "Greedy",
      timeLimit: "1.5s",
      successRate: "53%",
      description: "Find starting gas station to complete circular route",
    },
    {
      id: 24,
      name: "Skyline Problem",
      difficulty: "Hard",
      category: "Heap",
      timeLimit: "2s",
      successRate: "39%",
      description: "Get the skyline of a city given building heights",
    },
    {
      id: 25,
      name: "Valid Palindrome",
      difficulty: "Easy",
      category: "Strings",
      timeLimit: "1s",
      successRate: "77%",
      description:
        "Check if a string is a palindrome ignoring non-alphanumeric",
    },
    {
      id: 26,
      name: "Design Twitter",
      difficulty: "Medium",
      category: "Design",
      timeLimit: "1.5s",
      successRate: "51%",
      description: "Design a simplified version of Twitter",
    },
    {
      id: 27,
      name: "Word Ladder",
      difficulty: "Hard",
      category: "Graphs",
      timeLimit: "2s",
      successRate: "36%",
      description:
        "Transform one word to another through valid dictionary words",
    },
    {
      id: 28,
      name: "Maximum Depth of Binary Tree",
      difficulty: "Easy",
      category: "Trees",
      timeLimit: "1s",
      successRate: "84%",
      description: "Find the maximum depth of a binary tree",
    },
    {
      id: 29,
      name: "Perfect Squares",
      difficulty: "Medium",
      category: "DP",
      timeLimit: "1.5s",
      successRate: "55%",
      description: "Find minimum number of perfect squares that sum to n",
    },
    {
      id: 30,
      name: "Longest Consecutive Sequence",
      difficulty: "Hard",
      category: "Arrays",
      timeLimit: "2s",
      successRate: "43%",
      description:
        "Find length of longest consecutive sequence in unsorted array",
    },
    {
      id: 31,
      name: "Reverse String",
      difficulty: "Easy",
      category: "Strings",
      timeLimit: "1s",
      successRate: "86%",
      description: "Reverse a string in-place",
    },
    {
      id: 32,
      name: "Jump Game",
      difficulty: "Medium",
      category: "Greedy",
      timeLimit: "1.5s",
      successRate: "59%",
      description: "Determine if you can reach the last index",
    },
    {
      id: 33,
      name: "Edit Distance",
      difficulty: "Hard",
      category: "DP",
      timeLimit: "2s",
      successRate: "44%",
      description: "Find minimum operations to convert one string to another",
    },
    {
      id: 34,
      name: "Remove Duplicates",
      difficulty: "Easy",
      category: "Arrays",
      timeLimit: "1s",
      successRate: "80%",
      description: "Remove duplicates from sorted array in-place",
    },
    {
      id: 35,
      name: "Clone Graph",
      difficulty: "Medium",
      category: "Graphs",
      timeLimit: "1.5s",
      successRate: "54%",
      description: "Deep clone a connected undirected graph",
    },
    {
      id: 36,
      name: "Minimum Window Substring",
      difficulty: "Hard",
      category: "Sliding Window",
      timeLimit: "2s",
      successRate: "38%",
      description: "Find minimum window containing all characters of pattern",
    },
    {
      id: 37,
      name: "Single Number",
      difficulty: "Easy",
      category: "Bit Manipulation",
      timeLimit: "1s",
      successRate: "82%",
      description: "Find number that appears once in array",
    },
    {
      id: 38,
      name: "Decode Ways",
      difficulty: "Medium",
      category: "DP",
      timeLimit: "1.5s",
      successRate: "53%",
      description: "Count ways to decode a string of digits",
    },
    {
      id: 39,
      name: "Largest Rectangle",
      difficulty: "Hard",
      category: "Stack",
      timeLimit: "2s",
      successRate: "40%",
      description: "Find largest rectangular area in histogram",
    },
    {
      id: 40,
      name: "Linked List Cycle",
      difficulty: "Easy",
      category: "Linked Lists",
      timeLimit: "1s",
      successRate: "78%",
      description: "Detect cycle in a linked list",
    },
    {
      id: 41,
      name: "Task Scheduler",
      difficulty: "Medium",
      category: "Greedy",
      timeLimit: "1.5s",
      successRate: "55%",
      description: "Arrange tasks with cooldown period",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.get("http://localhost:8000/problem", {
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const problemsWithCount = response.data.data.map((problem) => ({
        id: problem.id,
        name: problem.name,
        difficulty: problem.difficulty || "Easy", // Default if missing
        category: "General", // Example category
        timeLimit: problem.timeLimit || "1s", // Default if missing
        successRate: "N/A", // Placeholder or calculate if available
        description: problem.description,
      }));
      setProblemData(problemsWithCount);
      // setProblemData(mockProblems);
    } catch (error) {
      console.error("Failed to fetch problem data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const incrementCount = (problemId) => {
    setProblemData((prev) =>
      prev.map((problem) =>
        problem.id === problemId
          ? { ...problem, count: (problem.count || 0) + 1 }
          : problem
      )
    );
    navigate(`/problem/${problemId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "hard":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const filteredProblems =
    filter === "all"
      ? problemData
      : problemData.filter((p) => p.difficulty.toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Problem List</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md ${
                  filter === "all" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("easy")}
                className={`px-4 py-2 rounded-md ${
                  filter === "easy" ? "bg-green-500 text-white" : "bg-gray-100"
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => setFilter("medium")}
                className={`px-4 py-2 rounded-md ${
                  filter === "medium"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setFilter("hard")}
                className={`px-4 py-2 rounded-md ${
                  filter === "hard" ? "bg-red-500 text-white" : "bg-gray-100"
                }`}
              >
                Hard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => incrementCount(problem.id)}
                  className="w-full text-left p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <BookOpen className="h-6 w-6 text-gray-400" />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {problem.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="mt-4 flex items-center space-x-6">
                    <div
                      className={`flex items-center space-x-1 ${getDifficultyColor(
                        problem.difficulty
                      )}`}
                    >
                      <Tag className="h-4 w-4" />
                      <span className="text-sm">{problem.difficulty}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{problem.timeLimit}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <BarChart2 className="h-4 w-4" />
                      <span className="text-sm">
                        Success Rate: {problem.successRate}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Attempts: {problem.count || 0}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemPage;
