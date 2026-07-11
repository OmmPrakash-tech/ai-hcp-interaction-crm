from langchain_core.messages import SystemMessage
from app.agent.llm import get_llm
from app.agent.prompts import SYSTEM_PROMPT
from app.agent.tools import tools

system_message = SystemMessage(content=SYSTEM_PROMPT)

assistant = get_llm().bind_tools(tools)


def assistant_node(state):
    """
    Calls the LLM and lets it decide whether to invoke a tool.
    """

    messages = [system_message] + state["messages"]

    response = assistant.invoke(messages)

    return {
        "messages": [response]
    }