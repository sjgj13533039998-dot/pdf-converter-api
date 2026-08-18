# 📄 PDF Converter API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/sjgj13533039998-dot/pdf-converter-api)](https://github.com/sjgj13533039998-dot/pdf-converter-api/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/sjgj13533039998-dot/pdf-converter-api)](https://github.com/sjgj13533039998-dot/pdf-converter-api/network/members)
[![GitHub issues](https://img.shields.io/github/issues/sjgj13533039998-dot/pdf-converter-api)](https://github.com/sjgj13533039998-dot/pdf-converter-api/issues)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)](https://javascript.info/)

> **Free, open-source PDF conversion API for developers.**

Convert PDF to Word, images, and text with a simple REST API. No signup required. No ads. Host yourself or use our free demo.

---

## ✨ Features

- **PDF to Word** - Convert PDF documents to editable Word files (DOCX)
- **PDF to Images** - Export PDF pages as high-quality JPG or PNG images
- **PDF to Text** - Extract text content from PDF documents
- **Merge PDF** - Combine multiple PDFs into one document
- **Compress PDF** - Reduce PDF file size without losing quality
- **No Signup** - Use immediately without creating an account
- **Free Forever** - Open source and free to use
- **Self-Hosted** - Deploy on your own server

---

## 🚀 Live Demo

Try it now: https://pdf-converter-api-new.onrender.com

---

## 📖 API Usage

### Convert PDF to Word

```bash
curl -X POST https://pdf-converter-api-new.onrender.com/api/convert \
  -F "file=@document.pdf" \
  -F "target_format=docx" \
  -o output.docx
```

### Convert PDF to Image

```bash
curl -X POST https://pdf-converter-api-new.onrender.com/api/convert \
  -F "file=@document.pdf" \
  -F "target_format=png" \
  -o output.png
```

### Extract Text from PDF

```bash
curl -X POST https://pdf-converter-api-new.onrender.com/api/convert \
  -F "file=@document.pdf" \
  -F "target_format=text"
```

### Merge Multiple PDFs

```bash
curl -X POST https://pdf-converter-api-new.onrender.com/api/merge \
  -F "pdfs=@doc1.pdf" \
  -F "pdfs=@doc2.pdf" \
  -o merged.pdf
```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | Node.js + Express |
| PDF Processing | pdf-lib, pdf2docx |
| File Upload | Multer |
| Deployment | Render (Free Tier) |
| Language | JavaScript/TypeScript |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/sjgj13533039998-dot/pdf-converter-api.git
cd pdf-converter-api

# Install dependencies
npm install

# Start the server
npm start
```

### Environment Variables

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*
```

---

## 📦 Deployment

### Deploy to Render (Free)

1. Push your code to GitHub
2. Go to [Render.com](https://render.com) and sign up
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: pdf-converter-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click "Create Web Service"

### Deploy to Railway (Free)

1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will auto-detect and deploy

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Live Demo**: https://pdf-converter-api-new.onrender.com
- **GitHub**: https://github.com/sjgj13533039998-dot/pdf-converter-api
- **Issues**: https://github.com/sjgj13533039998-dot/pdf-converter-api/issues

---

## 💬 Feedback

Found a bug? Have a feature request? Open an issue on GitHub!

---

**Made with ❤️ by [sjgj13533039998-dot](https://github.com/sjgj13533039998-dot)**

⭐ Star this repo if you find it helpful!
