import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

const app = express();
const server = http.createServer(app);
dotenv.config();

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Kullanıcı soket haritasını tutacak nesne
const userSocketMap = {};
let userCount = 0;
io.on("connection", (socket) => {
  console.log("Yeni kullanıcı bağlandı:", socket.id);
  const userId = socket.handshake.query.userId;
  userCount++;
  // Kullanıcı ID'sini soket ile eşleştir
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("userCountUpdated", userCount);
  console.log("Bağlı kullanıcı sayısı:", userCount);
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    userCount--;
    io.emit("userCountUpdated", userCount);
    console.log("Bağlı kullanıcı sayısı:", userCount);
  });
});

export const notifyOrderStatusUpdated = (userId, order) => {
  // Kullanıcıya sipariş durumu güncellendi mesajı gönder
  const socketId = userSocketMap[userId];
  if (socketId) {
    io.to(socketId).emit("orderStatusUpdated", {
      message: "Sipariş durumunuz güncellendi.",
      order,
    });
  }
};

export { app, io, server };
