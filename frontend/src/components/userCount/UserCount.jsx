import { User } from "lucide-react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const UserCountDisplay = () => {
  const [userCount, setUserCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_REACT_APP_API);
    setSocket(newSocket);
    newSocket.on("userCountUpdated", (count) => {
      setUserCount(count);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="fixed bottom-2 right-24">
      <span className="bg-orange-500 flex items-center justify-center text-white w-20 rounded-md">
        <User size={40} />
        <span className="text-[30px]">{userCount}</span>
      </span>
    </div>
  );
};

export default UserCountDisplay;
