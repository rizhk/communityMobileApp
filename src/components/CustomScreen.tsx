// CustomScreen.js
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Button } from "components/Button";
import { Stack, YStack } from "components/containers";
import { LeftArrow } from "assets/svg";
import { formatDateFromToday } from "utils/Date";
import { Text } from "components/Text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";

const CustomScreen = ({
  navigation,
  children,
}: {
  navigation: NativeStackNavigationProp<MainStackParamList>;
  children: React.ReactNode;
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack flex={1} pa={"md"} pt="xxxl">
          {/* <Button
            icon={LeftArrow}
            iconScale={3}
            rounded
            onPress={() => {
              navigation.goBack();
            }}
          /> */}

          {/* <Stack h={1} bc="grey600"></Stack> */}

          {children}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomScreen;
