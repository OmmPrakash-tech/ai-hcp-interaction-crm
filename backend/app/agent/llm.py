# from langchain_google_genai import ChatGoogleGenerativeAI
from app.config.settings import settings
from langchain_groq import ChatGroq

def get_llm():
    return ChatGroq(
        model=settings.MODEL_NAME,
        api_key=settings.GROQ_API_KEY,
        temperature=0,
    )