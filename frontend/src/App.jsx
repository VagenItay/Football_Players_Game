
import FirstPage from "./components/firstPage";
import LevelPage from "./components/levelPage";
import GamePage from "./components/gamePage";
import Achievement from "./components/achievements";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/levelPage" element={<LevelPage />}/>
        <Route path="/gamePage" element={<GamePage />}/>
        <Route path="/achievements" element={<Achievement/>}/>
      </Routes>
    </Router>

  );
}
