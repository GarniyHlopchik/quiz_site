from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    questions = relationship("Question", back_populates="quiz")""" Линк с вопросами """

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True)
    text = Column(String)
    quiz_id = Column(Integer, ForeignKey("quizzes.id")) """ Сосёт из квизов id """
    quiz = relationship("Quiz", back_populates="questions") """ Линк с квизами """
    options = relationship("Option", back_populates="question") """ Линк с опциями """

class Option(Base):
    __tablename__ = "options"
    id = Column(Integer, primary_key=True)
    text = Column(String)
    question_id = Column(Integer, ForeignKey("questions.id")) 
    question = relationship("Question", back_populates="options") """ Линк с вопросами """