#!/bin/bash

# Clone the repo
git clone https://github.com/VagenItay/Football_Players_Game
cd Football_Players_Game || exit

# Start frontend in background
cd frontend || exit
echo "Installing frontend dependencies..."
npm install

echo "Starting frontend server..."
npm run dev &

# Give frontend some time to start
sleep 3

# Open frontend in default browser
if which xdg-open > /dev/null
then
  xdg-open http://localhost:5173/
elif which open > /dev/null
then
  open http://localhost:5173/
else
  echo "Please open your browser and navigate to http://localhost:5173/"
fi

# Start backend
cd ../backend || exit
echo "Installing backend dependencies..."
pip install -r requirements.txt

echo "Starting backend server..."
uvicorn main:app --reload
