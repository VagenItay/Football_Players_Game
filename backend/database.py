from sqlalchemy import create_engine #creates connection to the DB
from sqlalchemy.ext.declarative import declarative_base #all models base
from sqlalchemy.orm import sessionmaker #manage connections to the DB efficiently

SQLALCHEMY_DATABASE_URL = "sqlite:///./myDataBase.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}) #connects the app to the DB with diff threads access

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
