/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage, setOrders } from "../redux/features/socketSlice";
import notificationSound from "/sounds/not.mp3";
import io from "socket.io-client";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_REACT_APP_API, {
        query: {
          userId: user._id,
        },
      });

      setSocket(newSocket);
      newSocket.on("orderStatusUpdated", (data) => {
        const message = data.message;
        const updatedOrder = data.order;
        data.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        dispatch(setOrders(updatedOrder));
        dispatch(setMessage(data.message));

        toast.success(message);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user, dispatch]);

  return <>{children}</>; // İçerikleri döndür
};

NotificationProvider.propTypes = {
  children: PropTypes.node,
};

export default NotificationProvider;
