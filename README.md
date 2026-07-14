# 🏥 AI HCP Interaction CRM

An AI-powered CRM application for logging, managing, and analyzing Healthcare Professional (HCP) interactions using **React**, **FastAPI**, **PostgreSQL**, **LangGraph**, and **Groq API**.

The application allows pharmaceutical representatives to interact with an AI assistant using natural language. The AI extracts structured interaction details, stores them in the CRM, and provides intelligent querying over historical interactions.

---

# 🚀 Features

## 🤖 AI Assistant
- Natural language interaction logging
- AI-powered information extraction
- Automatic form population
- Intelligent conversation handling
- Context-aware responses

---

## 📋 HCP Interaction Management

- Create interactions
- Update interactions
- Delete interactions
- View interaction history
- Search historical interactions

---

## 📊 Analytics Dashboard

- Total interactions
- Positive interactions
- Negative interactions
- Today's interactions
- Latest interaction summary

---

## 🧠 AI Capabilities

The AI agent can:

- Extract structured information from natural language
- Log interactions automatically
- Search previous interactions
- Count interactions
- Retrieve latest interaction
- Summarize interaction history
- Answer CRM-related questions

---

# 🏗️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Axios

---

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL
- LangGraph
- LangChain
- Groq API

---

## Database

PostgreSQL

---

## AI

- LangGraph
- LangChain
- llama-3.3-70b-versatile

---

# 📁 Project Structure

```
AI-HCP-Interaction-CRM
│
├── ai-hcp-interaction-crm-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── pages/
│   │   ├── types/
│   │   └── App.tsx
│   │
│   └── package.json
│
└── backend/
    ├── app/
    │
    ├── agent/
    ├── api/
    ├── config/
    ├── database/
    ├── memory/
    ├── models/
    ├── schemas/
    ├── services/
    ├── tools/
    ├── main.py
    │
    └── requirements.txt
```

---

# ⚙️ Installation

## 1 Clone Repository

```bash
git clone https://github.com/OmmPrakash-tech/AI-HCP-Interaction-CRM.git

cd AI-HCP-Interaction-CRM
```

---

# Backend Setup

## Create Virtual Environment

```bash
python -m venv .venv
```

Windows

```bash
.venv\Scripts\activate
```

Linux / Mac

```bash
source .venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment

Create

```
backend/.env
```

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/hcpcrm

GROQ_API_KEY=YOUR_API_KEY

MODEL_NAME=llama-3.3-70b-versatile
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

# Frontend Setup

```bash
cd ai-hcp-interaction-crm-frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

---

# API Endpoints

## Chat

```
POST /chat
```

---

## Interaction

```
GET    /interaction
GET    /interaction/{id}
POST   /interaction
PUT    /interaction/{id}
DELETE /interaction/{id}
```

---

## Analytics

```
GET /analytics
```

---

# Database Schema

## Interaction

| Field | Type |
|---------|------|
| id | Integer |
| hcp_name | String |
| interaction_type | String |
| interaction_date | Date |
| interaction_time | String |
| attendees | JSON |
| topics_discussed | JSON |
| sentiment | String |
| materials_shared | JSON |
| notes | Text |

---

# AI Workflow

```
User
      │
      ▼
React Frontend
      │
      ▼
FastAPI
      │
      ▼
LangGraph Agent
      │
      ▼
Groq LLM
      │
      ▼
Tool Calling
      │
      ▼
PostgreSQL
      │
      ▼
Response
      │
      ▼
Frontend Auto Fill
```

---

# Example Prompt

```
Log this interaction.

HCP Name: Dr. Ayesha Khan

Interaction Type: Hospital Visit

Interaction Date: 2026-07-15

Interaction Time: 11:20

Attendees:
- Medical Representative Rohan Verma
- Product Specialist Kavita Joshi

Topics:
- NeuroZen Tablets
- Migraine Management
- Patient Adherence

Sentiment:
Positive

Materials Shared:
- Clinical Evidence Booklet
- Product Catalogue

Notes:
Doctor appreciated the clinical trial results and agreed to prescribe NeuroZen for suitable patients.
```

---

# Future Improvements

- Voice-to-text interaction logging
- Authentication & Role-Based Access Control
- Calendar integration
- Follow-up reminders
- File upload support
- AI-generated meeting summaries
- Dashboard charts
- Export to PDF / Excel
- Advanced analytics
- Multi-user support

---

# Developed By

**Omm Prakash Debata**

B.Tech Computer Science Engineering

AI • Full Stack • DevOps

---

# License

This project is developed for educational purposes and technical assessment.
