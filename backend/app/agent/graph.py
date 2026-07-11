from langgraph.graph import StateGraph, END

from app.agent.state import AgentState
from app.agent.assistant import assistant_node
from app.agent.tool_node import tool_node

from langgraph.prebuilt import tools_condition


builder = StateGraph(AgentState)

builder.add_node(
    "assistant",
    assistant_node,
)

builder.add_node(
    "tools",
    tool_node,
)

builder.set_entry_point("assistant")

builder.add_conditional_edges(
    "assistant",
    tools_condition,
)

builder.add_edge(
    "tools",
    "assistant",
)

graph = builder.compile()