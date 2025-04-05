import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./achievements.css";
import api from "../api";

export default function Achievement()
{
    const location = useLocation();
    const navigate = useNavigate();
    const {inputData, displayName} = location.state || {};
    const [loading, setLoading] = useState(true);
    const [achievements, setAchievements] = useState([]);



    
    
    const getUserAchievements = async (name) => {
        try{
            const userResponse = await api.get(`/users/by_name/${name}`, { name: name});
            const userId = userResponse.data.id;
            const achievementsResponse = await api.get(`/users/${userId}/achievements/`);
            setAchievements(achievementsResponse.data); 
            console.log("found ach", achievementsResponse);
            setLoading(false);
        }catch (error) {
            console.error('Error fetching user and achievements:', error);
            setLoading(false);
          }
        };




    useEffect(() => {
        if (inputData) {
            getUserAchievements(inputData);
        }
    }, [inputData]);
        
    
    function displayAchievements() {
        if (loading) {
            return <p>Loading achievements...</p>;
        }

        if (achievements.length === 0) {
            return <p>No achievements found.</p>;
        }

        return achievements.map((achievement, index) => (
            <div key={index} className="achievement" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                <p><strong>Level:</strong> {achievement.level}</p>
                <p><strong>Right Answers:</strong> {achievement.right_answers}</p>
                <p><strong>Time:</strong> {achievement.time}</p>
            </div>

        ));
    }
    
    function handleSubmit()
    {
        navigate("/levelPage", { state: { inputData: inputData, displayName : displayName } });
    }



    return (
        <>
        <div id="name-on-top-ach">
            <h1>{displayName}</h1>
        </div>
        <div id="record-headline-container">
            <h1>your record:</h1>
        </div>
        {displayAchievements()}
        <button type="button" className="button" onClick={handleSubmit}> Go back </button>
        </>
    );
}