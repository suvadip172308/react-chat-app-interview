interface User {
  username: string;
  color: string;
}

export interface ChatMessage {
  body: string;
  user: User;
}

const chatData: ChatMessage[] = [
  {
    body: "Hello World!",
    user: {
      username: "JohnDoe",
      color: "#2e8b57",
    },
  },
  {
    body: "Reddit we did it!",
    user: {
      username: "JaneDoe",
      color: "#ff0000",
    },
  },
  {
    body: "Hey mom!",
    user: {
      username: "CannonBall",
      color: "#8a2be2",
    },
  },
  {
    body: "Is this a real chat?",
    user: {
      username: "Sergio",
      color: "#ff69b4",
    },
  },
  {
    body: "LOL",
    user: {
      username: "Someone",
      color: "#e6c600",
    },
  },
];

type CallBack = (data: ChatMessage) => void;
export enum EventType {
  ChatMessage = "chat-message",
}

const pubSub = () => {
  const eventTypes: { [key: string]: Array<CallBack> } = {};
  const hOP = eventTypes.hasOwnProperty;

  return {
    send: (type: EventType, message: ChatMessage) => {
      if (!hOP.call(eventTypes, type)) return;

      eventTypes[type].forEach((item: CallBack) => {
        item(message);
      });
    },
    on: (type: EventType, callback: CallBack) => {
      if (!hOP.call(eventTypes, type)) eventTypes[type] = [];

      const index = eventTypes[type].push(callback) - 1;

      return {
        disconnect: () => {
          delete eventTypes[type][index];
        },
      };
    },
  };
};

const chatSocket = pubSub();
/**
 * Open a socket to the chat backend
 * @returns
 */
export const chatSocketConnection = () => chatSocket;

function randomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let previousIndex = randomNumber(0, chatData.length - 1);
setInterval(() => {
  let randomIndex = randomNumber(0, chatData.length - 1);
  while (randomIndex === previousIndex) {
    randomIndex = randomNumber(0, chatData.length - 1);
  }
  previousIndex = randomIndex;
  chatSocket.send(EventType.ChatMessage, chatData[randomIndex]);
}, randomNumber(1000, 3000));
