import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "context/AuthContext";
import { AuthNavigatorParamList } from "navigators/AuthStack/AuthStack";
import { PinOutline } from "assets/svg";
import { Icon } from "components/Icon";
import { Text } from "components/Text";
import { Button } from "components/Button";
import GForm from "components/GForm/GForm";
import * as Yup from "yup";
import { Validations } from "constants/Validations";
import { spacing } from "theme";

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
    <SafeAreaView>
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 20}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: spacing.md }}>
              <Icon icon={PinOutline} preset="title" />
              <Text tx="loginScreen.title" preset="header" style={{ marginTop: 51 }} />
              <GForm
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
                submitTx="loginScreen.loginButton"
              >
                <View style={{ paddingVertical: spacing.lg }}>
                  <GForm.TextInput
                    valName="email"
                    tx="loginScreen.email"
                    placeholder="mail@pelops.ch"
                  />
                  <GForm.TextInput valName="password" tx="loginScreen.password" secureTextEntry />
                </View>
                <GForm.SubmitButton tx="loginScreen.loginButton" />
              </GForm>
              <Button onPress={signIn} tx="loginScreen.signIn" preset="outlined" />
              <Button onPress={forget} tx="loginScreen.forgotPassword" preset="plainText" />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
