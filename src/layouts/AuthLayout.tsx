import { useNavigation } from "@react-navigation/native";
import { LeftArrow, Pin } from "assets/svg";
import { Button } from "components/Button";
import { Icon } from "components/Icon";
import { KeyboardAvoiding } from "components/KeyboardAvoidind";
import { Text } from "components/Text";
import I18n from "i18n-js";
import { PropsWithChildren } from "react";
import { View, ImageBackground, TextStyle, ImageStyle, ViewStyle } from "react-native";
import { spacing, text } from "theme";

type Props = {
  route?: string;
  title: I18n.Scope;
};

export default function AuthLayout({ route, title, children }: PropsWithChildren<Props>) {
  const navigation = useNavigation();
  return (
    <ImageBackground style={image} source={require("assets/image/tile.png")}>
      <KeyboardAvoiding style={container}>
        <View style={outerContainer}>
          {route !== "login" && <Button icon={LeftArrow} onPress={() => navigation.goBack()} style={goBack} />}
          <View style={innerContainer}>
            <Icon icon={Pin} preset="title" />
            <Text text="CommunityApp" style={titleStyle} />
            <Text tx={title} preset="header" />
            {children}
          </View>
        </View>
      </KeyboardAvoiding>
    </ImageBackground>
  );
}

const goBack = {
  position: "absolute",
  top: 50,
  left: 50,
} as ViewStyle;

const container = {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
} as ViewStyle;

const outerContainer = {
  width: "100%",
} as ViewStyle;

const innerContainer = {
  padding: spacing.md,
  alignSelf: "stretch",
  flexDirection: "column",
} as ViewStyle;

const titleStyle = {
  fontSize: text.md,
  alignSelf: "center",
  padding: spacing.lg,
  textTransform: "uppercase",
} as TextStyle;

const image = {
  height: "100%",
  flex: 1,
} as ImageStyle;
