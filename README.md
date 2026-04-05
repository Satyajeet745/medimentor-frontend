# 🧠 MediMentor – AI Healthcare Assistant

## 🚀 Overview

MediMentor is a full-stack healthcare assistant that predicts possible diseases based on user symptoms and provides AI-powered medical suggestions.

The system combines **rule-based prediction logic** with **AI integration (LLaMA via Groq API)** to deliver faster and more relevant results.

---

## ⚙️ Features

* Symptom-based disease prediction
* Confidence score calculation
* AI chatbot for medical guidance
* Prescription analysis (basic)
* Clean dashboard UI

---

## 🧩 How It Works

1. User enters symptoms in the frontend
2. Frontend sends a POST request to `/api/predict`
3. Backend compares symptoms with predefined disease data
4. Calculates confidence:

   * `confidence = (matched symptoms / total symptoms) * 100`
5. Returns top matching diseases
6. AI (LLaMA) provides additional suggestions

---

## 🛠 Tech Stack

**Frontend**

* React (Vite)
* HTML, CSS, JavaScript

**Backend**

* Node.js
* Express.js

**AI Integration**

* Groq API (LLaMA)

---

## 🔗 Live Demo

https://medimentor-frontend.vercel.app

---

## 📁 Project Structure

/frontend → React app
/backend → Node.js API

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

---

## 🎯 Key Learning

* Built REST API (`/api/predict`) from scratch
* Implemented symptom-matching logic
* Integrated AI into real-world workflow
* Understood frontend-backend communication

---

## ⚠️ Note

This project is for educational purposes and not a replacement for professional medical advice.

---

## 👨‍💻 Author

Satyajit kahandal
