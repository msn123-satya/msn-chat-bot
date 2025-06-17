# 🧠AI Chatbot — AI Voice + Text Chat App (Gemini + FastAPI)

This is a full-stack AI chatbot that allows users to interact using voice or text. It uses a Google API key to connect the backend with Gemini Flash 2.0 (Google’s AI model) and fetch smart responses. It is built using:

- 💬 HTML, CSS, JavaScript (Frontend)
- 🐍 FastAPI + Python 3.10 (Backend)
- 🎤 Real-time voice-to-text input
- 🤖 Gemini AI with structured HTML responses

---

## 📁 Project Structure

Your project folder `msnchatbot/` is organized as follows:

```
msnchatbot/
├── frontend/                   # Frontend files
│   ├── index.html              # Main web page
│   ├── script.js               # Handles chat, mic, and UI logic
│   └── style.css               # Stylesheet
│
├── backend/                    # Backend FastAPI app
│   ├── main.py                 # FastAPI backend logic
│   ├── .env                    # Stores your Gemini API key (ignored by Git)
│   ├── .gitignore              # Contains venv/, __pycache__/, .env
│   ├── requirements.txt        # Python dependencies
│   ├── venv/                   # Python virtual environment (ignored)
│   └── __pycache__/            # Python cache (ignored)
│
└── README.md                   # Project documentation (this file)
```

---

## 🚀 Features

- Talk or type to chat with an AI assistant
- Voice input translates instantly to text
- Clean and formatted Gemini AI responses
- FastAPI handles backend API logic
- Gemini Flash 2.0 via Google SDK

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/msn123-satya/msn-chat-bot
cd msnchatbot
```

### 2. Set Up Python Environment

```bash
# Step 1: Move into the backend folder
cd backend

# Step 2: Create a virtual environment
python -m venv venv

# Step 3: Activate the virtual environment

# For Windows:
venv\Scripts\activate

# For macOS/Linux:
source venv/bin/activate

```

### 3. Install Required Python Packages

```bash
pip install -r requirements.txt
```

Your `requirements.txt` should include:

```
fastapi
uvicorn
python-dotenv
google-generativeai
```

### 4. Create the `.environment` File

Inside the `backend/` folder, create a file named `.env` and add your Gemini API key:

```
GEMINI_API_KEY=your-gemini-api-key-here
```

> ⚠️ This file is listed in `.gitignore` so it won’t be uploaded to GitHub.

### 5. Run the Backend Server

```bash
cd backend
uvicorn main:app --reload
```

---

## 💻 Open the Frontend

Go to the `frontend/` folder and open `index.html` in your browser:

```
msnchatbot/frontend/index.html
```

Once the backend is running and this page is open, you can:

- Click the mic button 🎤 to speak — it converts your voice to text.
- Or type directly in the input box.
- Click **Send** to get a structured AI response.
- Responses support formatted code and copy-paste.

---

## ❌ Files Ignored in GitHub

The following are excluded via `.ignore` (inside `backend/`):

```
.env
venv/
__pycache__/
```

This ensures sensitive data and unnecessary files are not uploaded.

---



## ✨ Author

**Makka Satyanarayana**

- GitHub: [msn123-satya](https://github.com/msn123-satya)
- LinkedIn: [makka-satyanarayana](https://www.linkedin.com/in/satya-python-dev)

---

## 🙏 Acknowledgments

- Google Gemini Flash 2.0 — for the powerful AI model
- FastAPI — for the lightweight Python backend
- HTML/CSS/JS — for a clean, responsive UI
