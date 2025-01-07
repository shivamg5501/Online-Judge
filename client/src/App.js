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
import AccountProvider from './contest/AccountProvider';
import Profile from './component/Profile/Profile';

function App() {
  return (
      <div className='App'>
      <AccountProvider>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/problem' element={<ProblemName />} />
            <Route path='/problem/:id' element={<ProblemIdPage />} />
            <Route path='/problem/:id/submission' element={<ProblemSubmission />} />
            <Route path='/problem/submission/:id' element={<ProblemSubmissionCode />} />
            <Route path='/Nav' element={<Nav />} />
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
        </Router>
        </AccountProvider>
      </div>
  );
}

export default App;
