import './App.css';
import {Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/Landing";
import Home from "./Components/Home/Home"
import Detail from './Components/Detail/Detail';
import Form from "./Components/Form/Form"


function App() {
  return (
  
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/detail/:id" component = {Detail}/>
          <Route exact path="/form" component ={Form}/>
        </Switch>
      </div>

  );
}

export default App;