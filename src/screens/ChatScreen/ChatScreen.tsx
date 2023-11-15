import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Localization from "expo-localization";
import { chatStyles } from "./chat.styles";
import { observer } from "mobx-react-lite";
import { PelopsScreen } from "../../types";
import { ChatCard } from "./ChatCard";
import i18n from "i18n-js";
import { FlatList } from "react-native-gesture-handler";
import { useChat } from "context/ChatContext";
import { ChannelCardProps } from "./chat.props";
import CreateChat from "./CreateChat";
// import SearchInput from "components/textinput/SearchInput";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { Tabs } from "components/Tabs";
import { MessageScreen } from "screens";
import { View } from "react-native";
import { Text } from "components/Text/Text";

i18n.locale = Localization.locale;
i18n.fallbacks = true;

type Props = NativeStackScreenProps<MainStackParamList, "chats">;
type ChatType = "private" | "group" | "event";

export function ChatScreen({ navigation }: Props) {
  return (
    <View>
      <Text>MessageScreen</Text>
    </View>
  );
}
export function ChatScreenTMP({ navigation }: Props) {
  const [chatType, setChatType] = useState<ChatType>("event");
  const [search, setSearch] = useState<string>("");
  const { myChannelUsers, joinChat } = useChat();
  const [channels, setChannels] = useState<ChannelCardProps[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<ChannelCardProps[]>([]);

  useEffect(() => {
    //get, sort and format channelUsers to channels
    const chans: ChannelCardProps[] = myChannelUsers
      .map((chanUsr) => {
        return {
          channel: chanUsr.channel,
          lastMessage: chanUsr?.lastMessage || undefined,
        };
      })
      .sort((a, b) => {
        const dateA = new Date(a.channel.lastMessage?.createdAt || 0);
        const dateB = new Date(b.channel.lastMessage?.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });
    setChannels(chans);
    filterChannel(chans, search, chatType);
  }, [myChannelUsers]);

  function filterChannel(chans: ChannelCardProps[], search: string, chatType: ChatType) {
    setFilteredChannels(
      chans.filter((chanUsr) => {
        let test;
        if (chatType === "private") test = chanUsr.channel.type === "private";
        else if (chatType === "group") test = chanUsr.channel.type === "group";
        else test = chanUsr.channel.type !== "private" && chanUsr.channel.type !== "group";
        return (
          test &&
          (chanUsr.channel.name?.toLowerCase().includes(search.toLowerCase()) || search === "")
        );
      })
    );
  }

  function handleSearch(search: string) {
    setSearch(search);
    filterChannel(channels, search, chatType);
  }

  function handleTypeChange(chatType: ChatType) {
    setChatType(chatType);
    filterChannel(channels, search, chatType);
  }

  return (
    <Tabs selected={chatType} handleSelect={handleTypeChange}>
      <Tabs.Group>
        <Tabs.Header value="event" tx="chat.eventMsg" />
        <Tabs.Header value="group" tx="chat.groupMsg" />
        <Tabs.Header value="private" tx="chat.privateMsg" />
      </Tabs.Group>
      <Tabs.Body style={{ position: "relative" }}>
        {/* <SearchInput search={search} handleSearch={handleSearch} sx={chatStyles.search} /> */}
        <FlatList
          data={filteredChannels}
          renderItem={({ item }) => (
            <ChatCard
              {...item}
              onPress={async () => await joinChat({ channelId: item.channel.id }, navigation)}
            />
          )}
        />
        <CreateChat />
      </Tabs.Body>
    </Tabs>
  );
}
