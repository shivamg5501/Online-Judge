import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Tag, Clock, BarChart2 } from 'lucide-react';
import Nav from '../Profile/LeftNav';

// Mock data to simulate API response
const mockProblems = [
  {
    id: 1,
    name: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    timeLimit: '1s',
    successRate: '75%',
    description: 'Find two numbers in an array that add up to a target'
  },
  {
    id: 2,
    name: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    category: 'Strings',
    timeLimit: '2s',
    successRate: '62%',
    description: 'Find the longest substring that reads the same forwards and backwards'
  },
  {
    id: 3,
    name: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    category: 'Trees',
    timeLimit: '1.5s',
    successRate: '45%',
    description: 'Find the path with maximum sum between any two nodes in a binary tree'
  },
  {
    id: 4,
    name: 'Merge Sorted Arrays',
    difficulty: 'Easy',
    category: 'Arrays',
    timeLimit: '1s',
    successRate: '82%',
    description: 'Merge two sorted arrays into a single sorted array'
  },
  {
    id: 5,
    name: 'Dynamic Programming Challenge',
    difficulty: 'Hard',
    category: 'DP',
    timeLimit: '2s',
    successRate: '38%',
    description: 'Solve a complex optimization problem using dynamic programming'
  }
];

const ProblemPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    const fetchProblems = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProblems(mockProblems.map(p => ({ ...p, attemptCount: 0 })));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch problems:', error);
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleProblemClick = (problemId) => {
    setProblems(prev => 
      prev.map(p => 
        p.id === problemId 
          ? { ...p, attemptCount: (p.attemptCount || 0) + 1 }
          : p
      )
    );
    navigate(`/problem/${problemId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const filteredProblems = filter === 'all' 
    ? problems 
    : problems.filter(p => p.difficulty.toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <Nav/>
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Problem List</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('easy')}
                className={`px-4 py-2 rounded-md ${filter === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
              >
                Easy
              </button>
              <button
                onClick={() => setFilter('medium')}
                className={`px-4 py-2 rounded-md ${filter === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}
              >
                Medium
              </button>
              <button
                onClick={() => setFilter('hard')}
                className={`px-4 py-2 rounded-md ${filter === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}
              >
                Hard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Problem List */}
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
                  onClick={() => handleProblemClick(problem.id)}
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
                    <div className={`flex items-center space-x-1 ${getDifficultyColor(problem.difficulty)}`}>
                      <Tag className="h-4 w-4" />
                      <span className="text-sm">{problem.difficulty}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{problem.timeLimit}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <BarChart2 className="h-4 w-4" />
                      <span className="text-sm">Success Rate: {problem.successRate}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Attempts: {problem.attemptCount || 0}
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