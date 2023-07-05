"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Image from "next/image";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [user, setUser] = useState<string>("");
  // const [socketUrl, setSocketUrl] = useState("ws://127.0.0.1:3030/chat");
  // const [messageHistory, setMessageHistory] = useState([]);

  // const socket = useWebSocket(socketUrl);

  // useEffect(() => {
  //   if (socket.lastMessage !== null) {
  //     console.log(socket.lastMessage.data);
  //   }
  // });

  // console.log();
  // socket.sendMessage("hello");
  const socket = useMemo(
    () => new WebSocket("wss://chat.chloevision.com:3030/chat"),
    []
  );

  // console.log(ws);
  socket.onopen = (e) => {
    // let a = prompt("Enter your name");
    // socket.send(a!);
    // setUser(a!);
  };
  socket.onmessage = (e) => {
    console.log(e.data);
    setMessages((messages) => [...messages, e.data]);
  };
  // ws.onmessage = (e) => {
  //   console.log(e.data);
  // };
  return (
    <div className="p-2 bg-blue-400 flex-1 flex  max-w-7xl w-full gap-2  flex-col-reverse">
      <div className="flex w-full px-10 gap-4">
        {" "}
        <input
          className="flex-1 rounded-lg"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
        />
        {user ? (
          <button
            className="bg-blue-500 px-4 py-2 rounded-md"
            onClick={() => {
              socket.send(input);
              setMessages([...messages, `<User#${user}>: ${input}`]);
              setInput("");
            }}
          >
            Send
          </button>
        ) : (
          <button
            className="bg-red-400 px-4 py-2 rounded-md w-fit"
            onClick={() => {
              socket.send(input);
              setUser(input);
              setInput("");
            }}
          >
            Set Name
          </button>
        )}
      </div>
      <div className=" bg-white flex-1 m-4 rounded-lg flex justify-end">
        <div className="px-10 flex gap-2 flex-col justify-end">
          {messages.map((message, index) => {
            return <div key={index}>{message}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
