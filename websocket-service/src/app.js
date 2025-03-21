require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { isUserExists } = require("./utils/userService");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Bağlı kullanıcıları takip etmek için bir nesne kullanıyoruz
const connectedClients = {};
app.use(express.json());
io.on("connection", (socket) => {
  console.log(`Yeni bir istemci bağlandı: ${socket.id}`);

  // Kullanıcıyı kaydet
  socket.on("register", async (userId) => {
    const valid = await isUserExists(userId);
    if (!valid) {
      console.log(`❌ User-service: Kullanıcı bulunamadı (${userId}).`);
      return socket.disconnect();
    }

    connectedClients[userId] = socket.id;
    console.log(`🟢 Kullanıcı "${userId}" WebSocket'e bağlandı. (Socket ID: ${socket.id})`);
  });
  

  // Kullanıcı bağlantıyı kapattığında sil
  socket.on("disconnect", () => {
    const userId = Object.keys(connectedClients).find(
      (key) => connectedClients[key] === socket.id
    );
    if (userId) {
      delete connectedClients[userId];
      console.log(`Kullanıcı ${userId} bağlantıyı kesti.`);
    }
  });
});

// API Endpoint: WebSocket mesajı göndermek için HTTP API


app.post("/send-invite", async (req, res) => {
  const { userId, groupId, message } = req.body;

  console.log(`🎯 Davet isteği: userId=${userId}, groupId=${groupId}`);

  // 1. Kullanıcı gerçekten var mı?
  const valid = await isUserExists(userId);
  if (!valid) {
    console.log("❌ Kullanıcı user-service'te bulunamadı.");
    return res.status(404).json({ success: false, message: "Kullanıcı bulunamadı." });
  }

  // 2. Kullanıcı bağlı mı?
  const socketId = connectedClients[userId];
  if (!socketId) {
    console.log("❌ Kullanıcı WebSocket'e bağlı değil. Davet gönderilemedi.");
    return res.status(400).json({ success: false, message: "Kullanıcı şu anda çevrimdışı." });
  }

  // 3. Davet gönder
  io.to(socketId).emit("group-invite", { groupId, message });
  console.log("✅ WebSocket ile davet gönderildi.");

  return res.status(200).json({ success: true, message: "Davet gönderildi." });
});





const PORT = process.env.PORT || 5010;
server.listen(PORT, () => {
  console.log(`WebSocket Service ${PORT} portunda çalışıyor.`);
});
