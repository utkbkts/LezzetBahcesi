/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage, setOrders } from "../redux/features/socketSlice";
import io from "socket.io-client";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user) {
      // Socket bağlantısını oluştur
      const newSocket = io(import.meta.env.VITE_REACT_APP_API, {
        query: {
          userId: user._id,
        },
      });

      setSocket(newSocket); // Socket durumunu güncelle

      // Sipariş durumu güncelleme olayını dinle
      newSocket.on("orderStatusUpdated", (data) => {
        const message = data.message; // Gelen mesaj
        const updatedOrder = data.order; // Güncellenmiş sipariş

        // Redux state'ini güncelle
        dispatch(setOrders(updatedOrder));
        dispatch(setMessage(message)); // Mesajı ayarla

        // Bildirim göster
        toast.success(message);
      });

      // Cleanup fonksiyonu
      return () => {
        newSocket.disconnect(); // Socket bağlantısını kapat
      };
    }
  }, [user, dispatch]); // user ve dispatch bağımlılık dizisine eklenmeli

  return <>{children}</>; // İçerikleri döndür
};

NotificationProvider.propTypes = {
  children: PropTypes.node,
};

export default NotificationProvider;
