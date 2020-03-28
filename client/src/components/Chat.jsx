import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

import "./Chat.scss";

const Chat = () => {
  const io = socketIOClient("http://localhost:5000");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([{ msg: "", position: "" }]);
  const content = useRef(null);
  useEffect(() => {
    io.on("chat-message", ({ position, msg }) => {
      setMessages([...messages, { position, msg }]);
    });
  });

  const sendMessage = e => {
    e.preventDefault();
    io.emit("send-message", { position: "right", msg });
    setMessages([...messages, { position: "left", msg }]);
    content.current.scrollIntoView(false);
    setMsg("");
  };

  return (
    <div className="chat">
      <div className="container">
        <header className="header">
          <h2>Chat bot</h2>
        </header>
        <div className="content">
          <div ref={content}>
            {messages.map(({ msg: message, position }, index) => {
              // console.log(message, position);
              return position !== "left" ? (
                <p key={index} style={{ textAlign: "left" }}>
                  {message}
                </p>
              ) : (
                <p key={index} style={{ textAlign: "right" }}>
                  {message}
                </p>
              );
            })}
          </div>
        </div>
        <footer className="footer">
          <form action="" className="form">
            <input
              id="m"
              autoComplete="off"
              value={msg}
              onChange={({ target: { value } }) => setMsg(value)}
            />
            <button onClick={sendMessage}>Send</button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
