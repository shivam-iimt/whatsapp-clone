import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios.js";
// import Messages from '../../whatsapp-backend/dbMessages';

function App() {
  const [messages, setmessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      const msgs = response.data;

      setmessages(msgs);
    });
  }, []);
  console.log(messages);

  useEffect(() => {
    const pusher = new Pusher("d2bde740ddc103283790", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setmessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
