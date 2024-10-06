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
const adminSocketMap = {};
let userCount = 0;
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("🚀 ~ io.on ~ userId:", userId);
  const role = socket.handshake.query.role;
  const adminId = role === "admin" ? userId : null;
  if (role === "user") {
    userSocketMap[userId] = socket.id;
  } else if (role === "admin") {
    adminSocketMap[adminId] = socket.id;
  }
  const find =
    socket.id !== userSocketMap[userId] &&
    socket.id !== adminSocketMap[adminId];
  if (find) {
    userCount++;
  } else {
    return;
  }
  io.emit("userCountUpdated", userCount);
  console.log("userCountUpdated", userCount);
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    delete adminSocketMap[adminId];
    userCount--;
    io.emit("userCountUpdated", userCount);
  });
});

export const notifyOrderStatusUpdated = (userId, order) => {
  const socketId = userSocketMap[userId];
  if (socketId) {
    io.to(socketId).emit("orderStatusUpdated", {
      message: "Sipariş durumunuz güncellendi.",
      order,
    });
  }
};

export const adminOrderNotify = (adminId) => {
  const socketId = adminSocketMap[adminId];
  if (socketId) {
    io.to(socketId).emit("new-order");
  }
};

export { app, io, server };
