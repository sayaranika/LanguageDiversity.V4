import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Diversity from "./components/Diversity";
import DensityAlt from "./components/DensityAlt";
//import DensityWithState from "./components/DensityWithState";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/densityMap" component={DensityAlt}></Route>
          <Route path="/diversityMap" component={Diversity}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
