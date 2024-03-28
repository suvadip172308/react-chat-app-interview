import { ChatMessage, chatSocketConnection, EventType } from "./chat";
import "./App.css";
import { useEffectOnce } from "./hooks";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function App() {
  const [ chatMsgs, setChatMsgs ] = useState<ChatMessage[]>([]);
  const [isColorBlindMode, setColorBlindMode ] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);
  
  useEffectOnce(() => {
    const socket = chatSocketConnection();
    socket.on(EventType.ChatMessage, (data) => {
      console.log(data);
      setChatMsgs(prevMsgs => [...prevMsgs, data]);
    });
  }, []);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [chatMsgs])

  const handleMode = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    console.log(isChecked);
    setColorBlindMode(isChecked);
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100 p-2">
      <h1 className="text-red-500 text-2xl">Magic Chat App</h1>
      <div className="my-2">
        <span className="mx-2">Color blind mode</span>
        <input type="checkbox" onChange={handleMode}/>
      </div>
      <div className="w-2/5 h-2/5 shadow-lg overflow-auto">
        <ul ref={listRef}>
          {
            chatMsgs.map((chatMsg, index) => {
              return (
                <li key={index}>
                  <span style={
                    isColorBlindMode? {color: '#000'} : {color: chatMsg.user.color}
                  }>{chatMsg.user.username}</span>
                  :
                  <span className="mx-2">{chatMsg.body}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}
