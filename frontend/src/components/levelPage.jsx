import { useLocation,useNavigate } from "react-router-dom";
import Header from "./Header";
import { randomNum } from "./helper_functions";

export default function LevelPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const {inputData, displayName} = location.state || {}; //to take the name and to check if returned from gamePage, check if still needed
    const gameMode = randomNum(2); // get 0 or 1 to set mode names or nationality

    
    
    function handleSubmit(level)
    {
        navigate("/gamePage", { state: { inputData: inputData, game_level: level, game_mode: gameMode, displayName: displayName } });
    }
    function handleGoToAchievements()
    {
            navigate("/achievements", { state: { inputData: inputData, displayName: displayName } });
    }

    return (
        <>
        <div id="name-on-top">
            <h1>{displayName}</h1>
        </div>
            
            <Header />
            <main id="auth-inputs">
            <button type="button" className="level-button" onClick={() => handleSubmit("easy")}> easy </button>
            <button type="button" className="level-button" onClick={() => handleSubmit("medium")}> medium </button>
            <button type="button" className="level-button" onClick={() => handleSubmit("hard")}> hard </button>
            <button type="button" className="record-button" onClick={handleGoToAchievements}> My record </button>
            <button type="button" className="button" onClick={()=>navigate("/")}> Disconnect </button>
        </main>
        </>
        
    );

}