import { useLocation,useNavigate } from "react-router-dom";
import './scoremessage.css';
export default function ScoreMessage({corrects,total,inputData,onRestart})
{
    
    return (
        <div id="game-over">
            <h1>Game Over</h1>
            <p>your score: {corrects} / {total - 1}</p>
            <p><button className="button" onClick={onRestart}>rematch</button></p>
        </div>
    );
}