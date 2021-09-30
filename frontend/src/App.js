import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostDetailPage from './pages/PostDetailPage';
import PostlistPage from './pages/PostlistPage';

const App = () => {
  return (
    <div>
      <Route path="/" component={PostlistPage} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/detail" component={PostDetailPage} />
    </div>
  );
};

export default App;
