import  { useState } from "react";
import * as io from "socket.io-client";
// import Chat from "./Baat.jsx";
import Chat from "./Baad";

import music from './mixkit-tile-game-reveal-960.wav'



// const serv ="https://chat-app-rrzo.onrender.com";

// const socket = io.connect("http://localhost:1000");
const socket = io.connect("https://chat-app-rrzo.onrender.com");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [showChat, setSetshowChat] = useState(false);

  const notification  = new Audio(music)

  const joinChat = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setSetshowChat(true)
      notification.play()
    }
  };

  return (
    <>
      {!showChat && (
        <div className="join_room">
          <h1>Join Chat</h1>
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Enter Chat room"
            onChange={(e) => setRoom(e.target.value)}
          ></input>
          <button onClick={joinChat}>JOIN</button>
        </div>
      )}

      {
        showChat && (
          <Chat socket={socket} username={username} room={room}></Chat>
        )
      }

    </>
  );
};

export default App;
