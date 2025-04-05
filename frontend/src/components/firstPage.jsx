
import Header from "./Header";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import api from "../api";


export default function FirstPage()
{
    const [playerName,setPlayerName] = useState("");
    const [password, SetPlayerPassword] = useState("");
    const navigate = useNavigate();


    // this function creates a user if not exist, if exist, the backend checks if the password match and then send the data or an error
    const createUser = async (name, password) => { 
        const achievements = [];
        try { // try to request post new user to DB
            const response = await api.post('/users/', { 
                name: name,
                password: password,
                achievements: achievements
            });
    
            const isNew = response.data.is_new; 
            const prefix = isNew ? "Welcome, " : "Welcome Back, ";
            const displayName = prefix + name;

            return { success: true, displayName };  // Always return this object if successful
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    return { success: false, error: "Incorrect password. Please try again." };  // Return password failure
                } else {
                    return { success: false, error: "An error occurred. Please try again." };  // Generic error
                }
            } else {
                // Catch any non-response errors (network issues, etc.)
                return { success: false, error: "An error occurred. Please try again." };
            }
        }
    };
    
        
    
    function handleName(new_name)
    {
        setPlayerName(new_name);
    }
    

    function handlePassword(new_password)
    {
        SetPlayerPassword(new_password);
    }


    function checkPassword(str)
    {
        if (str.length < 8) { 
            return { passwordBool: false, stringError: "Password must be at least 8 characters long." };
        }
        let checkNums=false, checkSmall=false, checkBig=false;
        for (let i=0; i < str.length; i++)
        {
            if (str[i] >='0' && str[i] <= '9') checkNums = true;
            if (str[i] >='a' && str[i] <= 'z') checkSmall = true;
            if (str[i] >='A' && str[i] <= 'Z') checkBig = true;
        }
        if (checkBig && checkNums && checkSmall) {
            return { passwordBool: true, stringError: "success" };
        }
        else return { passwordBool: false, stringError: "Password must contain a number and both small and capital letters." };

    }



    function handleSubmit()
    {
        if (playerName.length < 1){
            alert("Username is a required field");
            return;
        }

        const {passwordBool, stringError} = checkPassword(password)
        if (!passwordBool) {alert(stringError); return;}


        createUser(playerName, password).then(result => {
            if (result.success) {
                //Only navigate if the user creation is successful
                    navigate("/levelPage", { state: { inputData: playerName, displayName: result.displayName } });
            } else {
                alert(result.error);
            }
        });
    }

    
    return(
        <>
            <Header/>
            <main id="auth-inputs">
                <h1>Join or log in to play!</h1>
                <label htmlFor="name">Username:</label>
                <input type="name" id="name" value = {playerName} onChange={(event)=>handleName(event.target.value)}></input>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value = {password} onChange={(event)=>handlePassword(event.target.value)}></input>
                <button type="button" className="button" onClick={handleSubmit}> Login/Register </button>
            </main>
            

        </>
        
    );

}