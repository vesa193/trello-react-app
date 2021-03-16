import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HomePage from './pages/HomePage/HomePage';
import SingleBoardPage from './pages/SingleBoardPage/SingleBoardPage';
import { getBoards } from './pages/HomePage/action';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    initAppActions()
  }, [])

  const initAppActions = () => dispatch(getBoards())

  return (
    <main className="App">
       <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/board/:boardName" component={SingleBoardPage} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
