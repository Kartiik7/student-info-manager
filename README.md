# 🎓 Student Data Collection Project

A full-stack web application to collect and store student details with file upload functionality.  
Built using **HTML, CSS, JavaScript (Frontend)** and **Node.js, Express, MongoDB (Backend)**.

---

## 🚀 Features
- Collects student details via form
- Stores data in MongoDB
- File upload support (e.g., profile photo, documents)
- Backend API built with Express
- Frontend connected to backend API
- Ready for deployment on Render

---

## 🛠 Tech Stack
**Frontend:**
- HTML5
- CSS3
- JavaScript

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (for file uploads)
- dotenv (for environment variables)

---

## 📂 Folder Structure
student-data-collection/
│
├── backend/ # Backend logic
│ ├── server.js # Main server file
│ ├── package.json
│ ├── .env.example # Environment variable example
│ ├── uploads/ # Uploaded files (ignored in git)
│
└── frontend/ # Frontend UI
├── index.html
├── styles.css
└── script.js


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
git clone https://github.com/kartiik7/student-info-manager.git
cd student-info-manager/backend

npm install

2️⃣ Install dependencies
npm install

3️⃣ Set up environment variables
Create a .env file in the backend/ folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000

4️⃣ Start the backend server
npm start
