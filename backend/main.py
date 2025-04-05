from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Achievement, User
from crud import create_user, get_user, create_achievement, get_achievements, get_user_by_name
from schemas import UserCreate, AchievementCreate, UserOut, AchievementOut, UserWithStatusOut

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# **CORS Middleware Configuration**
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust to your frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=UserWithStatusOut)
def create_user_route(user: UserCreate, db: Session = Depends(get_db)):
    db_user, is_new = create_user(db=db, user=user)
    return {
        "id": db_user.id,
        "name": db_user.name,
        "is_new": is_new  # Return is_new flag
    }


# The function below is to add a new achievement to an already existing user
@app.post("/users/{user_id}/achievements/", response_model=AchievementOut)
def create_achievement_route(user_id: int, achievement: AchievementCreate, db: Session = Depends(get_db)):
    return create_achievement(db=db, achievement=achievement, user_id=user_id)

# To get all users
@app.get("/users/", response_model=list[UserOut])
def get_users_route(db: Session = Depends(get_db)):
    return db.query(User).all()

# To get user's achievements
@app.get("/users/{user_id}/achievements/", response_model=list[AchievementOut])
def get_achievements_route(user_id: int, db: Session = Depends(get_db)):
    return get_achievements(db=db, user_id=user_id)

# To get user by ID
@app.get("/users/{user_id}", response_model=UserOut)
def get_user_route(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# To get user by name
@app.get("/users/by_name/{name}", response_model=UserOut)
def get_user_by_name_route(name: str, db: Session = Depends(get_db)):
    db_user = get_user_by_name(db=db, name=name)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.delete("/clear-db/")
def clear_databases(db: Session = Depends(get_db)):
    # Delete all achievements first (since they depend on users)
    db.query(Achievement).delete()
    db.query(User).delete()
    db.commit()
    return {"message": "All users and achievements deleted."}
