import { SafeAreaView, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "context/AuthContext";
import { AuthNavigatorParamList } from "navigators/AuthStack/AuthStack";
import { PinOutline } from "assets/svg";
import { Icon } from "components/Icon";
import { Text } from "components/Text";
import { Button } from "components/Button";

type Props = NativeStackScreenProps<AuthNavigatorParamList, "login">;

export function LoginScreen({ navigation }: Props) {
  const { loginContext, setUser } = useAuth();
  return (
    <SafeAreaView>
      <ScrollView>
        {/* <KeyboardAvoidingView style={styles.main}> */}
        <KeyboardAvoidingView>
          <Icon icon={PinOutline} preset="title" />
          <Text tx="loginScreen.title" preset="header" style={{ marginTop: 51 }} />
          {/* <FormFromData
            formAction={loginContext}
            btnText={i18n.t("loginScreen.logInBtn")}
            formFields={formFields}
            btnStyle={"primary"}
            forgetPassword={true}
          />
          <Button
            label={i18n.t("loginScreen.signIn")}
            onPress={() =>
              navigation.navigate({
                name: "registration",
                params: { strategy: AuthStrategy.LOCAL },
              })
            }
            outlined
            color="primary"
            sx={styles.buttonOutline}
          /> */}
          <Button onPress={() => console.log("test")} tx="loginScreen.title" />
          <Button onPress={() => console.log("test")} tx="loginScreen.title" preset="outlined" />
          <Button onPress={() => console.log("test")} icon={PinOutline} text="ahah" />
          <Button icon={PinOutline} rounded size="sm" />
          <Button icon={PinOutline} rounded size="md" />
          <Button icon={PinOutline} rounded size="lg" />
          <Button icon={PinOutline} rounded size="xl" />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
