import { allPlayers } from "../all_players";
import { nations } from "../nations";

export function randomNum(max)
    {
        return (Math.floor(Math.random()*max));
    }
    
export function generate_buttons(right_player, nameORnation)
    {
        const index = randomNum(4);
        const buttons_array = [];
        const alreadyPickedIndex = new Set();
        for(let i=0;i<4;i++)
        {
            let current_array = nameORnation === 0 ? allPlayers : nations;
            let right_answer = nameORnation === 0 ? right_player["name"] : right_player["nationality"];
    
            if (i===index) {buttons_array.push({ name: nameORnation === 0 ? right_player["name"] : 
                right_player ["nationality"], correct: true });}
            else{
                let curr_index = randomNum(current_array.length);
                let randomNameNation = current_array[curr_index];
                while (alreadyPickedIndex.has(curr_index) || randomNameNation === right_answer){
                curr_index = randomNum(current_array.length);
                randomNameNation = current_array[curr_index];
                }
                alreadyPickedIndex.add(curr_index);
                buttons_array.push({name: randomNameNation, correct: false});
            }
            
        }
        return buttons_array;
    }
