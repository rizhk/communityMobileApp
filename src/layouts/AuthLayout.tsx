import { useNavigation } from "@react-navigation/native";
import { LeftArrow, Pin } from "assets/svg";
import { Button } from "components/Button";
import { Icon } from "components/Icon";
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
      {route !== "login" && (
        <Button icon={LeftArrow} onPress={() => navigation.goBack()} style={goBack} />
      )}
      <View style={container}>
        <Icon icon={Pin} preset="title" />
        <Text text="Pelops" style={titleStyle} />
        <Text tx={title} preset="header" />
        {children}
      </View>
    </ImageBackground>
  );
}

const goBack = {
  position: "absolute",
  top: 50,
  left: 50,
} as ViewStyle;

const container = {
  padding: spacing.md,
  alignSelf: "stretch",
} as ViewStyle;

const titleStyle = {
  fontSize: text.md,
  alignSelf: "center",
  padding: spacing.lg,
  textTransform: "uppercase",
} as TextStyle;

const image = {
  height: "100%",
  width: "100%",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
} as ImageStyle;
