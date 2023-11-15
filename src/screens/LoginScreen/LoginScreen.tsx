import { View, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "context/AuthContext";
import { AuthNavigatorParamList } from "navigators/AuthStack/AuthStack";
import { Button } from "components/Button";
import GForm from "components/GForm/GForm";
import * as Yup from "yup";
import { Validations } from "constants/Validations";
import { spacing } from "theme";
import AuthLayout from "layouts/AuthLayout";
import { AuthStrategy } from "types";

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

export function LoginScreen({ navigation, route }: Props) {
  const { setUser } = useAuth();
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
    <AuthLayout route={route.name} title="loginScreen.title">
      <GForm
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        submitTx="loginScreen.loginButton"
      >
        <View style={{ paddingVertical: spacing.md }}>
          <GForm.TextInput valName="email" placeholderTx="loginScreen.email" preset="thin" />
          <GForm.TextInput
            valName="password"
            placeholderTx="loginScreen.password"
            secureTextEntry
            preset="thin"
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
          onPressIn={() =>
            navigation.navigate({ name: "registration", params: { strategy: AuthStrategy.LOCAL } })
          }
        />
        <Button
          onPress={forget}
          tx="loginScreen.forgotPassword"
          preset="plainText"
          textStyle={{ fontWeight: "400" }}
        />
      </View>
      <Button onPress={() => setUser("dsd")} text="Go home" />
    </AuthLayout>
  );
}

const submitButton = {
  alignSelf: "center",
  height: 45,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.sm,
} as ViewStyle;
