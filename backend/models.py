from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from passlib.context import CryptContext  # For password hashing

# Initialize password hashing context
pwd_context = CryptContext(schemes=["argon2"])






class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    password = Column(String)

    achievements = relationship("Achievement", back_populates="owner")


    def set_password(self, password: str):
        """Hashes the password before storing it."""
        self.password = pwd_context.hash(password)
        #self.password = password

    def check_password(self, password: str) -> bool:
        print(f"Stored password hash: {self.password}")  # Add a print statement for debugging
        return pwd_context.verify(password, self.password)

        #return self.password == password

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    level = Column(String, index=True)  # easy, medium, hard
    right_answers = Column(Integer)  # Number of right answers
    time = Column(Float)  # Time spent in seconds (stored as float)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="achievements")
