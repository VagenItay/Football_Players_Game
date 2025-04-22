import { useLocation,useNavigate } from "react-router-dom";
import { players } from "../data_players";
import { useState,useEffect,useRef } from "react";
import ScoreMessage from "./scoreMessage";
import { randomNum, generate_buttons } from "./helper_functions";
import "./game.css";
import axios from 'axios';


export default function GamePage()
{  
    const navigate = useNavigate();//used to move between pages
    const location = useLocation(); const {inputData, game_level, game_mode, displayName} = location.state || {}; 
    const chosenPlayers = useRef(new Set());//all players already chosen for questions (avoid reptition)
    const [buttons,setButtons] = useState([]);//keeps the answers buttons
    const [countCorrects, setCorrects] = useState(0);//correct answers
    const [buttonsClicked,setClicked] = useState(0);
    const level_time = 25;
    const [timeLeft, setTimeLeft] = useState(level_time); //timer for the game



    const curr_players = players[game_level];//current players by level
    const [name, setPlayerName] = useState("");//current name of the player
    const [photo_Path, setPhotoPath] = useState("");
    const isLimitReached = buttonsClicked >= 10 || timeLeft <= 0;//check if finished 10 questions
   


    
    function handleSubmit()  // a function to return to the level page when finished
    {
        saveAchievement(inputData, game_level, countCorrects, timeLeft);
        navigate("/levelPage",{state: {inputData: inputData, displayName: displayName}}); 
    }
    function handleGoBack() // return to the level page without finishing the game
    {
            navigate("/levelPage",{state: {inputData: inputData, displayName: displayName}}); 
    }


    const saveAchievement = async (userName, level, rightAnswers, timeSpent) => {
        try {
            // Fetch user by name to get the user ID
            const userResponse = await axios.get(`http://localhost:8000/users/by_name/${userName}`);
            const userId = userResponse.data.id;

            const achievement = {
                level: level,
                right_answers: rightAnswers,
                time: level_time-timeSpent,
                
            };
            console.log("achievement created")
            // Save the achievement for the user
            await axios.post(`http://localhost:8000/users/${userId}/achievements/`, achievement);
            console.log("Achievement saved!");

        } catch (error) {
            console.error("Error saving achievement", error);
        }
    };


    function handleChangeName()//to change the current player after button click 
    {
        console.log("reach change name");
        let index = randomNum(curr_players.length);
        let new_player = curr_players[index];
        
        while(chosenPlayers.current.has(new_player["name"]))
        {
            index=randomNum(curr_players.length);//index to set the next player
            new_player = curr_players[index]; 
        }
        let curr_name = new_player["name"];
        setPhotoPath(new_player["image"]);
        setPlayerName(curr_name);
        setButtons(generate_buttons(new_player,game_mode));

        if (chosenPlayers.current.size < 10 && !chosenPlayers.current.has(curr_name)) {
            chosenPlayers.current.add(curr_name); // Add player to the set
          }
    }

      const handleButtonClick = (isCorrect) => {
        if (isCorrect) {
            setCorrects(countCorrects + 1);
        }
        // Update the buttonsClicked state using the previous state
        setClicked((prevClicked) => {
            const newClicked = prevClicked + 1;
        
            // Check if the limit is reached after the state is updated
            if (newClicked >= 10) {
                // If limit is reached, stop further name changes or any other logic
                return 10; 
            }
            return newClicked;
        });
    
    };



    useEffect(() => {
        // If limit is reached, stop updating players
        if (buttonsClicked < 10) {
            handleChangeName();
        }
    }, [buttonsClicked]); // This effect will run after buttonsClicked is updated


    useEffect(()=> {
        if(timeLeft <= 0 ) return;
        const timer = setInterval(() =>{
            setTimeLeft(prev => prev - 1);
        },1000);
        return () => clearInterval(timer);
    },[timeLeft]);



    return (
        <>

        <div id="name-on-top">
            <h1>Hi {inputData}, Time Left: {timeLeft}s</h1>
        </div> 

        

        <div id="game-container">
        {isLimitReached && (
            <>
            <ScoreMessage 
            corrects= {countCorrects} 
            total={chosenPlayers.current.size + 1} 
            inputData={inputData} 
            onRestart={handleSubmit} />
            </>
            )}
        
        

        {!isLimitReached && buttons.length === 4 &&
        <>
        <div id="img-container">
        {photo_Path && <img src={photo_Path} alt={name} />}
        </div>

        <div className="buttons-container">
         {buttons.map((button, index) => (
           <button key={index}
             className="answer-button"
             onClick={() => handleButtonClick(button.correct)}
           >
             {button.name}
           </button>
         ))}
        </div>
        </>
         
        }
        
        <button className ="button" onClick={handleGoBack}>Go back...</button>
        </div>
        </>
    );

}