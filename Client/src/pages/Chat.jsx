import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { MessageCircle, Send } from "lucide-react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
import { Flip, toast } from "react-toastify";
import validateLoader from "../utils/validateLoader";

const Chat = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const navigator = useNavigate();
  const { user, avatar } = useOutletContext();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [messages, setMessages] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
    const checkAuth = async () => {
      let isValid = false;
      try {
        if (!toast.isActive("Validation-Loading")) {
          isValid = await toast.promise(
            validateLoader(),
            { pending: "Please wait for validation" },
            {
              toastId: "Validation-Loading",
              position: "top-center",
              autoClose: 5000,
              theme: "colored",
              transition: Flip,
            }
          );
        } else {
          isValid = await validateLoader();
        }
      } catch (err) {
        console.error("Validation error:", err);
        isValid = false;
      }

      if (!isValid) {
        if (!toast.isActive("Validation-Error")) {
          toast.error("Validation failed", {
            toastId: "Validation-Error",
            position: "top-center",
            autoClose: 5000,
            theme: "colored",
            transition: Flip,
          });
        }
        navigator("/auth");
        return;
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigator, location]);

  useEffect(() => {
    try {
      socketRef.current = io(baseUrl, { withCredentials: true });

      socketRef.current.on("connect", () => {});

      socketRef.current.on("online users", (count) => {
        setOnlineUsers(count);
      });

      socketRef.current.on("load chat history", (msgs) => {
        setMessages(msgs);
      });

      socketRef.current.on("recieve chat message", (msgDetails) => {
        setMessages((prev) => [...prev, msgDetails]);
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
      });
    } catch (e) {}

    return () => {
      socketRef.current.disconnect();
    };
  }, [baseUrl]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socketRef.current.emit("send chat message", {
        id: Date.now() + Math.random(),
        avatar,
        user: user.name,
        msg: message,
        timestamp: Date.now(),
      });
      setMessage("");
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, msg) => {
      const dateKey = dayjs(msg.timestamp).format("YYYY-MM-DD");

      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(msg);

      return groups;
    }, {});
  };

  return loading ? (
    <></>
  ) : (
    <div className="flex justify-center items-center px-2">
      <div className="flex flex-col w-full max-w-[700px] bg-white p-3 sm:p-4 rounded-lg gap-3">
        <h1 className="flex gap-2 items-center text-gray-700 font-medium text-xl sm:text-2xl">
          <MessageCircle className="text-blue-500" />
          Global Chat
        </h1>
        <p className="text-gray-700 text-sm sm:text-base">
          Connect with other job seekers and share insights.
        </p>

        <p className="text-gray-700 text-sm sm:text-base">
          <span className="text-blue-500 font-bold text-2xl sm:text-3xl">
            {onlineUsers}
          </span>
          {onlineUsers === 1 ? " user " : " users "}
          currently in the chat.
        </p>

        {/* Chat Area */}
        <div className="border border-gray-400 rounded-sm bg-gray-200 p-2 h-[60vh] overflow-y-auto flex flex-col gap-2">
          {messages.length > 0 ? (
            Object.entries(groupMessagesByDate(messages)).map(
              ([date, msgs]) => (
                <div key={date} className="flex flex-col gap-1 sm:gap-2">
                  {/* Date header */}
                  <div className="flex justify-center my-2">
                    <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {dayjs(date).format("MMMM D, YYYY")}
                    </span>
                  </div>

                  {/* Messages for that date */}
                  {msgs.map((message) =>
                    message.user === user.name ? (
                      <div
                        key={message.id}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <div className="bg-blue-400 max-w-[80%] sm:max-w-[300px] w-fit min-w-[100px] rounded-lg p-2 ml-auto">
                          <h1 className="text-white font-medium flex justify-between items-center gap-2 text-xs sm:text-sm">
                            You
                            <span className="text-[10px] sm:text-xs">
                              {dayjs(message.timestamp).format("h:mm A")}
                            </span>
                          </h1>
                          <p className="break-words text-white text-sm sm:text-base">
                            {message.msg}
                          </p>
                        </div>
                        <h1 className="bg-blue-400 rounded-full w-8 h-8 sm:w-10 sm:h-10 text-white flex justify-center items-center text-sm sm:text-base">
                          {avatar}
                        </h1>
                      </div>
                    ) : (
                      <div
                        key={message.id}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <h1 className="bg-green-400 rounded-full w-8 h-8 sm:w-10 sm:h-10 text-white flex justify-center items-center text-sm sm:text-base">
                          {message.avatar}
                        </h1>
                        <div className="bg-gray-300 rounded-lg p-2 max-w-[80%] sm:max-w-[300px] w-fit min-w-[100px]">
                          <h1 className="text-gray-700 font-medium flex justify-between items-center gap-2 text-xs sm:text-sm">
                            {message.user}
                            <span className="text-[10px] sm:text-xs">
                              {dayjs(message.timestamp).format("h:mm A")}
                            </span>
                          </h1>
                          <p className="break-words text-gray-700 text-sm sm:text-base">
                            {message.msg}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )
            )
          ) : (
            <p className="text-sm sm:text-base">
              Seems empty? Start messaging.
            </p>
          )}
          {/*  Dummy div to scroll into view */}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            type="text"
            className="border-2 p-2 text-gray-700 border-gray-300 w-full focus:outline-blue-500 rounded-full text-sm sm:text-base"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 p-3 sm:p-4 rounded-full flex justify-center items-center"
          >
            <Send className="text-white size-4 sm:size-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
