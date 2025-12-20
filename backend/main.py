from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import sessionmaker, Session, declarative_base, relationship, selectinload
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from models import Quiz, Base, Question, Option
from pydantic import BaseModel, Field, ConfigDict
from typing import List
from fastapi.middleware.cors import CORSMiddleware

SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)
origins = [
    "http://localhost",
    "http://localhost:8080", 
    "https://bobaquiz.com", 
]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # Allows cookies to be sent across origins
    allow_methods=["*"],    # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],    # Allows all headers (including Authorization, Content-Type, etc.)
)


#таким класом визначається структура даних, що приходять з фронтенду
""" Варианты ответов """
class OptionData(BaseModel):
    text: str
    correct: bool
    
    class Config:
        from_attributes = True 
        """ Прикол из Pydantic чтобы он понимал SQLAlchemy модели """
"""  вопсос с вариантами ответов """
class QuestionData(BaseModel):
    text: str
    options: list[OptionData]
    
    class Config:
        from_attributes = True

""" Викторина с вопросами """
class QuizData(BaseModel):
    title: str
    questions: list[QuestionData]
    
    class Config:
        from_attributes = True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#приклад обробки запиту з використанням бази даних
@app.get("/api/get_quiz/{id}", response_model=QuizData)
def get_quiz(id: int, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).options(
        selectinload(Quiz.questions).selectinload(Question.options)
        
    ).filter(Quiz.id == id).first() 
    """ Жёстко высасываем данные с связями """
    if not quiz:
        """ Если у нас протечка даём 404 и пусть сам решает что делать """
        raise HTTPException(status_code=404, detail="Quiz not found")
        """ Собсвтенно 404 """
    return db.query(Quiz).filter(Quiz.id == id).first()
    # запит до записів з моделі Quiz де id відповідає нашому, перший 

#також приклад з POST, який додає запис із даним 
@app.get("/api/get_quizzes")
def get_quizzes(db: Session = Depends(get_db),response_model=List[QuizData]):
    return db.query(Quiz).all()
    


@app.post("/api/add_quiz/", response_model=QuizData)
def add_quiz(quiz_data: QuizData, db: Session = Depends(get_db)):
    new_quiz = Quiz(title=quiz_data.title)
    new_questions = []
    for question_data in quiz_data.questions: # Перебираем вопросы из пришедших данных """
        new_question = Question(text=question_data.text, quiz=new_quiz) # Создаём новый вопрос и связываем его с квизом """
        for option_data in question_data.options: # Перебираем варианты ответов из пришедших данных """
            new_option = Option(text=option_data.text, correct=option_data.correct, question=new_question) # Создаём новый вариант ответа и связываем его с вопросом """
            new_question.options.append(new_option) # Добавляем вариант ответа в список вариантов вопроса """
        new_questions.append(new_question) # Добавляем вопрос в список вопросов квиза """

    db.add(new_option)
    db.add(new_question)
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz) #підбирає з бд уже з визначеним айдішником
    return new_quiz # Возвращаем созданный квиз """
@app.delete("/api/delete_quiz/{id}")
def delete_quiz(id: int, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == id).first()
    if not quiz:
        return False
    else:
        db.delete(quiz)
        db.commit()
        return True