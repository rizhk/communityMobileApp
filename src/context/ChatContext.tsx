import React, { createContext, useEffect, useState, useContext, PropsWithChildren } from "react";
import io, { Socket } from "socket.io-client";
import { getApiUrl } from "api/request";
import { useAuth } from "./AuthContext";
import { ChannelUserItem, MessageItem, channelType } from "types/message";
import { fetchMyChannelUsers } from "api/chatRequest";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DeepNavParam } from "navigators/navigator.types";

export type ChannelParamType = {
  channelId?: number;
  id?: number;
  type?: channelType;
};
export interface ChatContextType {
  chatSocket: Socket | null;
  myChannelUsers: ChannelUserItem[];
  setMyChannelUsers: (p: ChannelUserItem[]) => void;
  currentChannelUser: ChannelUserItem | undefined | null;
  setCurrentChannelUser: (p: ChannelUserItem | undefined | null) => void;
  messages: MessageItem[];
  setMessages: (p: MessageItem[]) => void;
  updateChannelUserLastMessage: (lastMessage: MessageItem) => void;
  joinChat: (
    param: ChannelParamType,
    navigation?: NativeStackNavigationProp<DeepNavParam, any, undefined> | undefined
  ) => Promise<void>;
  leaveChat: (param: ChannelParamType) => Promise<void>;
  createChannel: (type: channelType, id: number) => void;
  deleteChannel: (channelId: number) => void;
  // newMessageNotification: any;
  // setNewMessageNotification: (p: any) => void;
  // newMessageNotificationCount: any;
  // setNewMessageNotificationCount: (p: any) => void;
  // newMessageNotificationCountIncrement: (nb: number) => void;
  // newMessageNotificationCountDecrement: (nb: number) => void;
}

//logging when testing, should be deleted at one point
const TEST = false;

export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export function ChatProvider({ children }: PropsWithChildren) {
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);
  const [myChannelUsers, setMyChannelUsers] = useState<ChannelUserItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [currentChannelUser, setCurrentChannelUser] = useState<ChannelUserItem | null | undefined>(
    null
  );

  // const [newMessageNotification, setNewMessageNotification] = useState<any>(null);
  // const [newMessageNotificationCount, setNewMessageNotificationCount] = useState<number>(0);
  const { user, userToken } = useAuth();

  useEffect(() => {
    if (!user || !userToken) return;
    // console.log("userToken", userToken);
    const socket = io(getApiUrl(), {
      // const socket = io("http://localhost:1337", {
      // auth: { token: null },
      // auth: { token: "3d1s12d21ad132as" },
      auth: { token: userToken },
    });
    if (!socket) return;
    if (TEST) {
      socket.on("connect", () => {
        console.log("connected to chat");
      });

      socket.on("connect_error", (err) => {
        console.log("connection error: ", err);
        socket.disconnect();
        setChatSocket(null);
      });

      //TEST PURPOSE
      socket.on("disconnect", (reason: string) => {
        console.log("disconnected from chat", reason);
      });
      socket.on("error", (err: string) => {
        console.log("Server Error :", err);
      });
      socket.on("log", (log: string) => {
        console.log("Server LOG: ", log);
      });
    }

    let channelUsers = [];
    fetchMyChannelUsers(Number(user.id), userToken).then((res) => {
      channelUsers = res.data;
      setMyChannelUsers(res.data);
      channelUsers.forEach((chanUser: ChannelUserItem) => {
        socket.emit("joinChannel", chanUser.channel.id);
      });
    });

    //TODO: get New channelUser when added to new channel (server side needed)
    socket.on("newChannelUser", (channelUser: ChannelUserItem) => {
      if (myChannelUsers.find((chanUser) => chanUser.id === channelUser.id)) return;
      setMyChannelUsers((prevChannelUsers) => [...prevChannelUsers, channelUser]);
      socket.emit("joinChannel", channelUser.channel.id);
    });

    setChatSocket(socket);
    if (TEST) console.log("ChatSocket OK!");
    return () => {
      socket.disconnect();
      setChatSocket(null);
    };
  }, [userToken, user]);

  useEffect(() => {
    if (!chatSocket) return;
    chatSocket.on("newMessage", (message: MessageItem) => {
      if (message.channel.id === currentChannelUser?.channel.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
        updateChannelUserLastMessage(message);
      }
      updateLastMessages(message);
    });
    if (TEST)
      console.log(
        "ChatSocket newMessage ON! (currentChannelUser : ",
        currentChannelUser?.id,
        ", ",
        currentChannelUser?.channel.id,
        ", ",
        currentChannelUser?.channel.name,
        " )"
      );

    return () => {
      chatSocket.off("newMessage");
      if (TEST) console.log("ChatSocket newMessage OFF!");
    };
  }, [chatSocket, currentChannelUser]);

  //update channelUser lastMessageId on the server
  function updateChannelUserLastMessage(lastMessage: MessageItem) {
    const channelUser = myChannelUsers.find(
      (chanUser) => chanUser.channel.id === lastMessage.channel.id
    );
    if (!channelUser) return;
    chatSocket?.emit("updateChannelUserLastMessage", {
      channelUserId: channelUser?.id,
      lastMessageId: lastMessage.id,
    });
    updateLastMessages(lastMessage);
  }

  //update the last message of the channelUser in the myChannelUsers state (client side)
  function updateLastMessages(lastMessage: MessageItem) {
    setMyChannelUsers((prevChannelUsers) => [
      ...prevChannelUsers.map((prevChanUser) => {
        if (prevChanUser.channel.id !== lastMessage.channel.id) return prevChanUser;
        const newChanUser = JSON.parse(JSON.stringify(prevChanUser));
        if (currentChannelUser?.channel.id === lastMessage.channel.id)
          newChanUser.lastMessage = lastMessage;
        newChanUser.channel.lastMessage = lastMessage;
        return newChanUser;
      }),
    ]);
  }

  function getChannelUser(type: channelType, id: number) {
    let channelUser = null;
    switch (type) {
      case "private":
        channelUser = myChannelUsers.find((chanUser) => chanUser.channel.userId === id);
        break;
      case "activity":
        channelUser = myChannelUsers.find((chanUser) => chanUser.channel.activity?.id === id);
        break;
      // case "tournament":
      //   channelUser = myChannelUsers.find((chanUser) => chanUser.channel.tournament?.id === id);
      //   break;
      case "sport":
        channelUser = myChannelUsers.find((chanUser) => chanUser.channel.sport?.id === id);
        break;
    }
    return channelUser;
  }

  async function joinChat(
    param: ChannelParamType,
    navigation: NativeStackNavigationProp<DeepNavParam, "chats", undefined> | undefined = undefined
  ) {
    const { channelId, type, id } = param;
    console.log("joinChat", channelId, type, id);
    if (!channelId && (!id || !type)) return console.log("joinChannel error: missing param");

    let channelUser = null;
    if (channelId)
      channelUser = myChannelUsers.find((chanUser) => chanUser.channel.id === channelId);
    else if (type && id) channelUser = getChannelUser(type, id);

    if (channelUser && navigation) navigation.navigate("message", { channelUser: channelUser });
    if (!channelUser && !channelId) {
      chatSocket?.emit("joinChat", type, id, async (channelUserRes: ChannelUserItem) => {
        if (!channelUserRes) return console.log("joinChannel error: nothing received from server");
        navigation && navigation.navigate("message", { channelUser: channelUserRes });
      });
    }
  }

  async function leaveChat(param: ChannelParamType) {
    const { channelId, type, id } = param;
    let channelUser = null;
    if (channelId)
      channelUser = myChannelUsers.find((chanUser) => chanUser.channel.id === channelId);
    else if (type && id) channelUser = getChannelUser(type, id);
    if (!channelUser) return;
    chatSocket?.emit("leaveChat", channelUser.channel.id, (res: any) => {
      console.log("leaveChat res", res);
    });
  }

  function createChannel(type: channelType, id: number) {
    chatSocket?.emit("createChannel", type, id);
  }

  function deleteChannel(channelId: number) {
    chatSocket?.emit("deleteChannel", channelId);
  }

  return (
    <ChatContext.Provider
      value={{
        chatSocket,
        myChannelUsers,
        setMyChannelUsers,
        currentChannelUser,
        setCurrentChannelUser,
        messages,
        setMessages,
        updateChannelUserLastMessage,
        joinChat,
        leaveChat,
        createChannel,
        deleteChannel,
        // newMessageNotification,
        // setNewMessageNotification,
        // newMessageNotificationCount,
        // setNewMessageNotificationCount,
        // newMessageNotificationCountIncrement: (nb = 1) =>
        //   setNewMessageNotificationCount(newMessageNotificationCount + nb),
        // newMessageNotificationCountDecrement: (nb = 1) =>
        //   setNewMessageNotificationCount(newMessageNotificationCount - nb),
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
