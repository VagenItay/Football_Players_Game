
# Football Players Game

## Overview
A fun and interactive web application designed for football fans who want to test their knowledge of famous football players. In this game, players are tasked with guessing the names or nationalities of the players, with questions organized by difficulty level. 

The app allows users to easily **register**, **log in**, and start playing anytime. Progress is saved, and users can view their achievements at any time.

---

## Features

This web app is divided into four main pages, each designed to provide a smooth and engaging experience for users:

1. **Login and Register Page**  
   - Allows new users to register and existing users to log in.
   - Ensures players can securely log in to their accounts and track their progress.

2. **Level Picking Page**  
   - After logging in, users can choose the difficulty level they want to play: Easy, Medium, or Hard.
   - This page also serves as the central hub, connecting all the other pages, meaning users can navigate to other pages only through it after logging in.

3. **Achievements Page**  
   - Users can view their progress and track all their achievements, including the level, number of correct answers, and the time taken to complete each achievement.
   - This page is a motivational tool for players to keep track of their performance.

4. **The Game Page**  
   - The heart of the web app, where users can play the guessing game.
   - Displays photos of the players along with four possible answers.
   - Includes a timer to track the time taken to answer.

---

## Key Features and Functionality

- **User Registration & Login**: Users can create an account with a unique username and password, ensuring they can access their achievements and game progress across sessions.
- **Levels of Difficulty**: The game offers multiple difficulty levels, so users can select the challenge that best suits their skills.
- **Real-time Progress Tracking**: Users' achievements are saved and displayed in their profile, motivating them to keep playing and improving.
- **Security**: The app includes secure password hashing to ensure users' data remains protected.

---

## How It Works

1. **Registration/Login**  
   When users first visit the site, they can either register or log in. For registration, users provide a unique username and a password (with security measures in place to ensure strong passwords). Once registered, they can easily log in using their credentials.

2. **Level Selection**  
   After logging in, users are directed to the level picking page where they choose their desired level: Easy, Medium, or Hard. The difficulty of the questions adjusts accordingly, ensuring that the game remains challenging for all players.

3. **Playing the Game**  
   After selecting a level, users are directed to the game page where they are challenged to guess either the name or the nationality of a player based on their image.

4. **Achievements**  
   As users progress through the game, they can check their achievements page, where they can see their completed games: level,number of right answers, and the total time spent on the game. This encourages users to keep playing and improve their scores.

---

## Technologies Used

- **Frontend**:  
   - **React** for building the user interface and handling the state of the application.
   - **CSS/HTML** for styling and responsive design.
   - **React Router** for managing page navigation.
   - **Axios** for making HTTP requests to the backend API.

- **Backend**:  
   - **FastAPI** for building the RESTful API that handles user authentication, level selection, and achievement tracking.
   - **SQLAlchemy** for database management and data persistence.
   - **SQLite** for lightweight and efficient database management.
   - **Passlib** for password hashing and ensuring secure password storage.

- **Database**:  
   - **SQLite** stores user information and achievements, ensuring that users' progress is preserved across sessions.

---

## Getting Started

To set up and run the application locally:

### Prerequisites

- Install [Node.js](https://nodejs.org/) for the frontend.
- Install [Python](https://www.python.org/) and [pip](https://pip.pypa.io/en/stable/) for the backend.
- Install [SQLite](https://www.sqlite.org/) for the database.

### Frontend Setup

1. Clone the repository:
   ```
   git clone https://github.com/VagenItay/Football_Players_Game
   cd Football_Players_Game
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the backend server:
   ```
   uvicorn main:app --reload
   ```

4. Visit `http://localhost:5173` to start playing! 
**notice: local host can be a different number**

---

## Future Improvements

- **Multi-language support**: Add multiple languages to make the game accessible to a wider audience.
- **Leaderboard**: Implement a global leaderboard to encourage friendly competition.
- **User profile customization**: Allow users to personalize their profiles with avatars or custom usernames.
- **Extend the data** : add more players to the data to improve game level

---

## Conclusion

Enjoy the game!
