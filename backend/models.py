from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    questions = relationship("Question", back_populates="quiz", cascade="all, delete-orphan")# Линк с вопросами """
    

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True)
    text = Column(String)
    quiz_id = Column(Integer, ForeignKey("quizzes.id", ondelete="CASCADE")) # Сосёт из квизов id """
    quiz = relationship("Quiz", back_populates="questions") # Линк с квизами """
    options = relationship("Option", back_populates="question",cascade="all, delete-orphan") # Линк с опциями """
    

class Option(Base):
    __tablename__ = "options"
    id = Column(Integer, primary_key=True)
    text = Column(String)
    question_id = Column(Integer, ForeignKey("questions.id", ondelete="CASCADE")) 
    question = relationship("Question", back_populates="options") # Линк с вопросами """
    correct = Column(Boolean)