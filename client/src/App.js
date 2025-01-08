import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './component/homepage/homepage';
import Login from './component/login/login';
import Register from './component/register/register';
import ProblemName from './component/problem/problem';
import ProblemIdPage from './component/problemid/problemid';
import ProblemSubmission from './component/problemSubmitted/problemSubmitted';
import ProblemSubmissionCode from './component/problemSubmission/problemSubmission';
import Nav from './component/Profile/LeftNav';
import Profile from './component/Profile/Profile';
import { AuthProvider } from './AuthProvider';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
  
            {/* Protected Routes */}
            <Route
              path="/problem"
              element={
                <ProtectedRoute>
                  <ProblemName />
                </ProtectedRoute>
              }
            />
            <Route
              path="/problem/:id"
              element={
                <ProtectedRoute>
                  <ProblemIdPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/problem/:id/submission"
              element={
                <ProtectedRoute>
                  <ProblemSubmission />
                </ProtectedRoute>
              }
            />
            <Route
              path="/problem/submission/:id"
              element={
                <ProtectedRoute>
                  <ProblemSubmissionCode />
                </ProtectedRoute>
              }
            />
            <Route
              path="/nav"
              element={
                <ProtectedRoute>
                  <Nav />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
