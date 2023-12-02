import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import {
  View,
  Text,
  // TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ImageBackground
} from "react-native";
// import { fetchMessages } from "api/chatRequest";
// import { fetchActivityQS } from "api/custom-request";
// import { Avatar } from "components/Avatar";
// import { ChatIcon, GoBackButton } from "components/Button/GenericButtons";
// import { useAuth } from "context/AuthContext";
// import { useChat } from "context/ChatContext";
// import { format } from "date-fns";
// import * as I18n from "i18n-js";
// import { useEffect, useState } from "react";
// import { FlatList } from "react-native-gesture-handler";
// import { palette } from "theme/palette";
// import { ChannelItem, MessageItem } from "types/message";

// import { Message } from "./Message";
// import { MessageScreenStyles } from "./message.styles";
// import { default as BgChat } from "../../../assets/bgChat.png";

type Props = NativeStackScreenProps<MainStackParamList, "message">;

// const NB_MESSAGES_PER_FETCH = 20;

export function MessageScreen({ navigation, route }: Props) {
  return (
    <View>
      <Text>MesageScreen</Text>
    </View>
  );
}
// export function MessageScreenTMP({ navigation, route }: Props) {
//   const [newMessage, setNewMessage] = useState("");
//   const { userToken } = useAuth();
//   const {
//     chatSocket,
//     myChannelUsers,
//     currentChannelUser,
//     setCurrentChannelUser,
//     messages,
//     setMessages,
//     updateChannelUserLastMessage,
//   } = useChat();
//   const [showEndButton, setShowEndButton] = useState<boolean>(false);
//   const [fetchingNewMsgs, setFetchingNewMsgs] = useState<boolean>(false);
//   const [allMsgLoaded, setAllMsgLoaded] = useState<boolean>(false);
//   let listViewRef: FlatList<MessageItem> | null;
//   const [channel, setChannel] = useState<ChannelItem | undefined>(undefined);
//   const [date, setDate] = useState<Date | null>(null);

//   useEffect(() => {
//     if (!chatSocket) return;
//     const channelUser = route.params.channelUser;
//     setCurrentChannelUser(channelUser);
//     setChannel(channelUser.channel);
//     switch (channelUser.channel.type) {
//       case "activity":
//         setDate(channelUser.channel?.activity?.date);
//         break;
//       case "tournament":
//         setDate(channelUser.channel?.tournament?.date);
//         break;
//       default:
//         break;
//     }
//     return () => {
//       setCurrentChannelUser(undefined);
//     };
//   }, [chatSocket]);

//   useEffect(() => {
//     if (!chatSocket || !channel || !currentChannelUser) return;
//     fetchMessages(channel.id, -1, NB_MESSAGES_PER_FETCH, userToken).then((res) => {
//       const msgs = res.data;
//       setMessages(msgs);
//       if (msgs < NB_MESSAGES_PER_FETCH) setAllMsgLoaded(true);

//       if (msgs.length > 0 && currentChannelUser?.id)
//         updateChannelUserLastMessage(msgs[msgs.length - 1]);
//       listViewRef?.scrollToEnd({ animated: true });
//     });

//     return () => {};
//   }, [channel, currentChannelUser]);

//   function sendMessage() {
//     if (!channel) return new Error("Channel is not defined");
//     chatSocket?.emit("sendMessage", { content: newMessage, channelId: channel.id });
//     setNewMessage("");
//   }

//   function addPhotos() {
//     console.log("add photos");
//   }

//   function handleCamera() {
//     console.log("handle camera");
//     console.log(myChannelUsers);
//   }

//   function handleMenu() {
//     console.log("handle menu");
//     console.log("channel: ", JSON.stringify(channel, null, 2));
//     console.log("message.length", messages.length);
//   }

//   function fetchOlderMessages() {
//     if (fetchingNewMsgs) return;
//     if (messages.length === 0 || allMsgLoaded || !channel) return;
//     setFetchingNewMsgs(true);

//     fetchMessages(channel.id, messages[0].id, NB_MESSAGES_PER_FETCH, userToken).then((res) => {
//       const newMessages: MessageItem[] = res.data;
//       if (newMessages.length < NB_MESSAGES_PER_FETCH) setAllMsgLoaded(true);
//       if (newMessages.length === 0) return;
//       setMessages((prevMessages: MessageItem[]) => [...newMessages, ...prevMessages]);
//     });
//     setTimeout(() => {
//       setFetchingNewMsgs(false);
//     }, 2000);
//   }

//   function endButtonHandler() {
//     listViewRef?.scrollToEnd({ animated: true });
//   }

//   function channelDetailButton() {
//     if (!channel) return;
//     switch (channel.type) {
//       case "private":
//         if (!channel.user) return;
//         navigation.navigate("other-profile", { userId: channel.user.id });
//         break;
//       case "activity":
//         fetchActivityQS(channel.activity.id, userToken).then((activityData: ActivityData) => {
//           navigation.navigate("activity", { activity: activityData.data });
//         });
//         break;
//       default:
//         console.log("needs to be implemented");
//         break;
//     }
//   }

//   return (
//     <View testID="ConversationScreen" style={{ ...MessageScreenStyles.outerContainer }}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "height" : undefined}
//         contentContainerStyle={{ flexShrink: 1 }}
//         style={{ flexShrink: 1 }}
//       >
//         <View testID="ConversationScreen" style={MessageScreenStyles.innerContainer}>
//           <View style={MessageScreenStyles.header}>
//             <GoBackButton navigation={navigation} scale={0.7} />
//             <TouchableOpacity
//               style={MessageScreenStyles.channelDetails}
//               onPress={channelDetailButton}
//             >
//               <Avatar source={channel?.image} size={35} />
//               <View style={MessageScreenStyles.channelDetailsTextContainer}>
//                 <Text style={MessageScreenStyles.channelDetailsText}>
//                   {channel?.name &&
//                     channel?.name.substring(0, 21) + (channel?.name.length > 21 ? "..." : "")}
//                 </Text>
//                 {date && (
//                   <Text style={MessageScreenStyles.channelDetailsDate}>
//                     {format(new Date(date), "dd/MM/yyyy")}
//                   </Text>
//                 )}
//               </View>
//             </TouchableOpacity>
//             <ChatIcon iconName="menu" iconType={IconType.Ionicons} onPress={handleMenu} />
//           </View>
//           <ImageBackground
//             source={BgChat}
//             resizeMode="cover"
//             style={MessageScreenStyles.feedContainer}
//           >
//             <FlatList
//               data={messages}
//               renderItem={({ item, index }) => (
//                 <Message
//                   message={item}
//                   prevDate={index > 0 ? messages[index - 1].createdAt : undefined}
//                   key={index}
//                 />
//               )}
//               style={MessageScreenStyles.feed}
//               onContentSizeChange={() =>
//                 !showEndButton &&
//                 messages.length > 1 &&
//                 listViewRef?.scrollToEnd({ animated: true })
//               }
//               onScroll={(event) => {
//                 const offsetY = event.nativeEvent.contentOffset.y;
//                 const feedHeight =
//                   event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
//                 if (offsetY < feedHeight - 150) setShowEndButton(true);
//                 if (offsetY <= 0) fetchOlderMessages();
//               }}
//               onEndReached={() => setShowEndButton(false)}
//               ref={(ref) => (listViewRef = ref)}
//             />
//             {showEndButton && (
//               <ChatIcon
//                 iconName="chevrons-down"
//                 iconType={IconType.Feather}
//                 onPress={endButtonHandler}
//               />
//             )}
//           </ImageBackground>
//           <View style={MessageScreenStyles.footer}>
//             <ChatIcon iconName="plus" iconType={IconType.Feather} onPress={addPhotos} />
//             <TextInput
//               editable={true}
//               placeholder={I18n.t("message.type")}
//               value={newMessage}
//               onChangeText={setNewMessage}
//               style={MessageScreenStyles.textInput}
//               placeholderTextColor={palette.darkGrey}
//               onSubmitEditing={sendMessage}
//               multiline={true}
//             />
//             {newMessage.length === 0 && (
//               <ChatIcon iconName="camera" iconType={IconType.Ionicons} onPress={handleCamera} />
//             )}
//             {newMessage.length > 0 && (
//               <ChatIcon
//                 iconName="send"
//                 iconType={IconType.Ionicons}
//                 onPress={() => {
//                   sendMessage();
//                 }}
//               />
//             )}
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }
// add camera
// https://www.freecodecamp.org/news/how-to-create-a-camera-app-with-expo-and-react-native/
