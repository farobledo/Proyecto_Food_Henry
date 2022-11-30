import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import RecipeCreate from "./components/RecipeCreate";

import Details from "./components/Details";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes/:id" element={<Details />} />
        <Route path="/recipe" element={<RecipeCreate />} />
      </Routes>
    </div>
  );
}

export default App;
