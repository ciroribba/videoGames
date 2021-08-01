import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import './App.css';
import Create from "./components/create.js/Create";
import VideoGameDetail from './components/videogameDetail/VideoGameDetail';

function App() {
  return (
    <React.Fragment>
     <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Home}/>
      <Route path="/videogame/:id" component={VideoGameDetail}/>
      <Route path="/create" component={Create}/>
        {/*<Route path="/" component={Create}/>  */}
    </React.Fragment>
  );
}

export default App;
