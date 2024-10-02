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

io.on("connection", (socket) => {
  // Order ID'sini al
  const userId = socket.handshake.query.userId;

  // Kullanıcı ID'sini soket ile eşleştir
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Kullanıcı bağlantısı kesince
  socket.on("disconnect", () => {
    // Kullanıcıyı soket haritasından çıkar
    delete userSocketMap[userId];
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
