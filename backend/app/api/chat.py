from fastapi import APIRouter
import json

from langchain_core.messages import HumanMessage, ToolMessage

from app.agent.graph import graph
from app.schemas.chat_schema import ChatRequest, ChatResponse

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"],
)


@router.post(
    "",
    response_model=ChatResponse,
)
async def chat(request: ChatRequest):

    result = graph.invoke(
    {
        "messages": [
            HumanMessage(content=request.message)
        ]
    },
    config={
        "configurable": {
            "thread_id": "demo-user"
        }
    }
)

    messages = result["messages"]

    ai_message = messages[-1]

    # ----------------------------
    # Convert Gemini content
    # ----------------------------

    content = ai_message.content

    if isinstance(content, list):
        text = ""

        for block in content:
            if isinstance(block,dict):
                text += block.get("text","")
            else:
                text += str(block)

        content = text

    if content is None:
        content = ""

    # ----------------------------
    # Extract Tool Result
    # ----------------------------

    tool_name = None
    form_data = None

    for message in messages:

        if isinstance(message, ToolMessage):

            try:

                data = json.loads(message.content)

                tool_name = data.get("tool")
                form_data = data.get("form_data")

            except Exception:
                pass

    return ChatResponse(
        success=True,
        response=content,
        tool=tool_name,
        form_data=form_data,
    )