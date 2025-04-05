from pydantic import BaseModel
from typing import List

class AchievementBase(BaseModel): 
    level: str
    right_answers: int
    time: float  # Time spent in minutes


class AchievementCreate(BaseModel):
    level: str
    right_answers: int
    time: float  # or int, depending on how you want to handle time

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    name: str
    password: str
    achievements: List[AchievementCreate]  # List of achievements

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    name: str



#  responsible for serializing the response to include both the User data and the is_new flag.
class UserWithStatusOut(BaseModel):
    id: int
    name: str
    is_new: bool  # Add is_new flag here

    class Config:
        from_attributes = True





class UserOut(UserBase):
    id: int
    achievements: list[AchievementBase] = []

    class Config:
        from_attributes = True

class AchievementOut(AchievementBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
