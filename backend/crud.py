from sqlalchemy.orm import Session
from models import User, Achievement
from schemas import UserCreate, AchievementCreate
from fastapi import HTTPException,status


from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["argon2"])

def hash_password(password: str) -> str:
    return pwd_context.hash(password)



def create_user(db: Session, user: UserCreate):
    existing_user = db.query(User).filter(User.name == user.name).first()
    if existing_user:
        if existing_user.check_password(user.password):
            return existing_user, False  # Passwords match, return the existing user
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password"
            )
        


    hashed_password = hash_password(user.password)

    db_user = User(name=user.name, password=hashed_password)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Save the achievements for the user
    for achievement in user.achievements:
        db_achievement = Achievement(
            level=achievement.level,
            right_answers=achievement.right_answers,
            time=achievement.time,  # Parse time spent
            user_id=db_user.id
        )
        db.add(db_achievement)
    db.commit()  # Commit all achievements
    db.refresh(db_user)
    
    return db_user, True

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_name(db: Session, name: str):
    return db.query(User).filter(User.name == name).first()

def create_achievement(db: Session, achievement: AchievementCreate, user_id: int):
    db_achievement = Achievement(
        level=achievement.level,
        right_answers=achievement.right_answers,
        time=achievement.time,  # Parse time spent
        user_id=user_id
    )
    db.add(db_achievement)
    db.commit()
    db.refresh(db_achievement)
    return db_achievement

def get_achievements(db: Session, user_id: int):
    return db.query(Achievement).filter(Achievement.user_id == user_id).all()
