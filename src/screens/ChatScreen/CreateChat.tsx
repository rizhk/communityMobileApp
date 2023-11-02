import { Modal, Text } from "react-native";
import React, { useState } from "react";
import { createStyles } from "./chat.styles";
import { View } from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SearchInput from "components/textinput/SearchInput";
import { ButtonIcon, CrossButton, List } from "components";
import { IconType } from "react-native-dynamic-vector-icons";

export default function CreateChat() {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState<string>("");
  const toggleModal = () => setModalVisible(!modalVisible);
  return (
    <>
      <ButtonIcon
        onPress={toggleModal}
        iconName="chatbubble-ellipses-outline"
        iconType={IconType.Ionicons}
        sx={{ position: "absolute", bottom: 10, right: 10 }}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        style={createStyles.modal}
      >
        <View style={createStyles.container}>
          <View style={createStyles.innerContainer}>
            <View style={createStyles.header}>
              <Text style={createStyles.title}>New Chat</Text>
              <CrossButton onPress={toggleModal} />
            </View>
            <SearchInput
              search={search}
              handleSearch={() => console.log("search")}
              sx={createStyles.searchBar}
            />
            <List sx={createStyles.list}>
              <List.Item
                label="New Group"
                onPress={() => console.log("New Group")}
                icon={<FontAwesome name="group" size={24} color="black" />}
              />
              <List.Item
                label="New User"
                onPress={() => console.log("New User")}
                icon={<FontAwesome name="user-plus" size={24} color="black" />}
              />
              <List.Header label="Followings" sx={createStyles.listHeader} />
            </List>
          </View>
        </View>
      </Modal>
    </>
  );
}
