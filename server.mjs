// server.mjs
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

// `__dirname`과 `__filename`을 ES 모듈에서 사용 가능하도록 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Vite 서버 생성
  const vite = await createViteServer({
    server: { middlewareMode: "html" },
    configFile: path.resolve(__dirname, "vite.config.js"),
  });

  // Vite의 미들웨어를 사용
  app.use(vite.middlewares);

  // 정적 파일 제공
  app.use(express.static(path.join(__dirname, "public")));

  // 기타 라우팅 설정
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  // 기본 포트 설정
  let PORT = process.env.PORT || 3000;

  // 서버 시작
  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  // 포트 충돌 에러 처리
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${PORT} is already in use. Trying another port...`);
      PORT += 1; // 포트를 1 증가
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer();