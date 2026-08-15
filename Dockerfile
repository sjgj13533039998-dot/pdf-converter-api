FROM node:20-slim

WORKDIR /app

# 复制 package 文件
COPY package.json package-lock.json ./

# 安装依赖
RUN npm install --production --no-audit --no-fund 2>&1

# 复制应用代码
COPY server/ ./server/
COPY public/ ./public/

# 暴露端口
EXPOSE 8080

# 启动命令
CMD ["node", "server/index.js"]
