from langchain_google_genai import ChatGoogleGenerativeAI

from app.config.settings import settings


class AIService:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model=settings.MODEL_NAME,
            google_api_key=settings.GEMINI_API_KEY,
            temperature=0.2,
        )

    def invoke(self, prompt: str):
        response = self.llm.invoke(prompt)
        return response.content


ai_service = AIService()