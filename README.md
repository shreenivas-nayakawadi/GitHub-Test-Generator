# GitHub Test Case Generator

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://git-hub-test-generator.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An AI-powered tool that generates comprehensive unit test cases for source code in public GitHub repositories.


## ✨ Features

- 🔍 Browse source files from any public GitHub repository
- 🧠 AI-powered test generation using Google Gemini
- ⚙️ Supports multiple languages:
  - JavaScript/TypeScript (Jest, Mocha)
  - Java (JUnit)
  - Python (unittest, pytest)
  - And more (C, C++, C#, PHP, Ruby, Go, Swift, Kotlin, Rust)
- 📋 One-click test copying to clipboard
- 🚀 Fast and intuitive interface

## 🛠️ Tech Stack

**Frontend:**
- React
- Axios
- Vite

**Backend:**
- Node.js
- Express
- Google Gemini API
- GitHub API

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn
- Google Gemini API key
- GitHub Personal Access Token

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shreenivas-nayakawadi/GitHub-Test-Generator.git
   ```

2. Set up the backend:
   ```bash
   cd GitHub-Test-Generator/backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Edit .env with your backend URL
   ```

### Running Locally

1. Start backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser

## 🔧 Configuration

### Backend Environment Variables
```
GEMINI_API_KEY=your_google_gemini_api_key
GITHUB_TOKEN=your_github_personal_access_token
PORT=5000
```

### Frontend Environment Variables
```
VITE_BACKEND_URL=http://localhost:5000
```

## 📖 Usage

1. Enter a GitHub repository URL or `owner/repo` format
2. Browse available source files
3. Select a file to view its contents
4. Choose your preferred test framework
5. Click "Generate Tests" to get AI-powered unit tests
6. Copy tests to clipboard with one click

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- Google Gemini AI
- GitHub REST API
- All contributors and users
