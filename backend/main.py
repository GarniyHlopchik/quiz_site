from fastapi import FastAPI
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine
from fastapi import Depends
from models import Quiz, Base
from pydantic import BaseModel

SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#приклад обробки запиту з використанням бази даних
@app.get("/api/get_quiz/{id}")
def get_quiz(id: int, db: Session = Depends(get_db)):
    return db.query(Quiz).filter(Quiz.id == id).first()
    # запит до записів з моделі Quiz де id відповідає нашому, перший 

#також приклад з POST, який додає запис із даним тайтлом

#таким класом визначається структура даних, що приходять з фронтенду
class QuizData(BaseModel):
    title: str
@app.post("/api/add_quiz/")
def add_quiz(quiz_data: QuizData, db: Session = Depends(get_db)):
    new_quiz = Quiz(title=quiz_data.title)
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz) #підбирає з бд уже з визначеним айдішником
    return new_quiz 