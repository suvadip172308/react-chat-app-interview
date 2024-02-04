import { chatSocketConnection, EventType } from "./chat";
import "./App.css";
import { useEffectOnce } from "./hooks";

export default function App() {
  useEffectOnce(() => {
    const socket = chatSocketConnection();
    socket.on(EventType.ChatMessage, (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100 p-2">
      <h1 className="text-red-500 text-2xl">Magic Chat App</h1>
    </div>
  );
}
