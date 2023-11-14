import { ImageBackground, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "context/AuthContext";
import { AuthNavigatorParamList } from "navigators/AuthStack/AuthStack";
import { Pin, PinOutline } from "assets/svg";
import { Icon } from "components/Icon";
import { Text } from "components/Text";
import { Button } from "components/Button";
import GForm from "components/GForm/GForm";
import * as Yup from "yup";
import { Validations } from "constants/Validations";
import { color, spacing, text } from "theme";

type Props = NativeStackScreenProps<AuthNavigatorParamList, "login">;

type LoginValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Validations.emailRequired,
  password: Validations.password,
});

const initialValues: LoginValues = {
  email: "",
  password: "",
};

export function LoginScreen({ navigation }: Props) {
  const { loginContext, setUser } = useAuth();

  const signIn = () => {
    console.log("signIn");
  };

  const forget = () => {
    console.log("forget");
  };

  const handleSubmit = (values: LoginValues) => {
    console.log(values);
  };

  return (
    <ImageBackground style={image} source={require("assets/image/tile.png")}>
      <View style={container}>
        <Icon icon={Pin} preset="title" />
        <Text text="Pelops" style={title} />
        <Text tx="loginScreen.title" preset="header" />
        <GForm
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          submitTx="loginScreen.loginButton"
        >
          <View style={{ paddingVertical: spacing.md }}>
            <GForm.TextInput
              valName="email"
              placeholderTx="loginScreen.email"
              inputStyle={inputStyle}
              containerStyle={inputContainer}
            />
            <GForm.TextInput
              valName="password"
              placeholderTx="loginScreen.password"
              secureTextEntry
              inputStyle={inputStyle}
              containerStyle={inputContainer}
            />
          </View>
          <GForm.SubmitButton tx="loginScreen.loginButton" style={submitButton} />
        </GForm>
        <View style={{ alignItems: "center", gap: spacing.md }}>
          <Button
            onPress={signIn}
            tx="loginScreen.signIn"
            preset="plainText"
            style={{ marginTop: 30 }}
          />
          <Button
            onPress={forget}
            tx="loginScreen.forgotPassword"
            preset="plainText"
            textStyle={{ fontWeight: "400" }}
          />
        </View>
      </View>
      <Button onPress={() => setUser("dsd")} text="Go home" />
    </ImageBackground>
  );
}

const container = {
  padding: spacing.md,
  alignSelf: "stretch",
  // marginHorizontal: spacing.xs,
} as ViewStyle;

const inputContainer = {
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.sm,
} as ViewStyle;

const inputStyle = {
  height: 35,
  backgroundColor: color.grey800,
  width: "100%",
} as ViewStyle;

const title = {
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
} as ImageStyle;

const submitButton = {
  alignSelf: "center",
  height: 45,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.sm,
} as ViewStyle;
