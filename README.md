# PDF Converter API

一个基于 Node.js 的 PDF 转换 API 服务。

## 功能

- PDF 转图片（JPG/PNG）
- 合并多个 PDF
- 压缩 PDF

## 安装

```bash
cd server
npm install
```

## 运行

```bash
npm start
```

服务器将在 http://localhost:3000 启动

## API 端点

### 上传文件
```
POST /api/upload
Content-Type: multipart/form-data
Body: file=@document.pdf
```

### 转换 PDF
```
POST /api/convert
Content-Type: multipart/form-data
Body: pdf=@document.pdf
```

### 合并 PDF
```
POST /api/merge
Content-Type: multipart/form-data
Body: pdfs=@doc1.pdf,pdfs=@doc2.pdf
```

## 部署到生产环境

### 使用 Render.com（免费）
1. 注册 https://render.com
2. 创建新 Web Service
3. 连接 GitHub 仓库
4. 设置构建命令：`npm install`
5. 设置启动命令：`npm start`
6. 添加环境变量：
   - `PORT=10000`（Render 会自动分配）

### 使用 Railway.app（免费）
1. 注册 https://railway.app
2. 创建新项目
3. 从 GitHub 导入
4. 自动部署

## 定价建议

- Free: 10 次转换/月
- Pro: $9.99/月，1000 次转换
- Enterprise: $49.99/月，无限次

## 技术栈

- Node.js + Express
- pdf-lib（PDF 处理）
- Multer（文件上传）
- CORS（跨域支持）

## 文件结构

```
pdf-converter-api/
├── server/
│   └── index.js          # 后端服务器
├── public/
│   └── index.html        # 前端界面
├── package.json          # 依赖配置
└── README.md             # 文档
```
