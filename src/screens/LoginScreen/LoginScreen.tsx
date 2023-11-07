import { SafeAreaView, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from "./styles";
import { color } from "theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "context/AuthContext";
import { AuthNavigatorParamList } from "navigators/AuthStack/AuthStack";
import { GButton } from "components/Button";
import { translate } from "i18n";
import { AddUser, PinOutline } from "assets/svg";
import { Text } from "components/Text/Text";

type Props = NativeStackScreenProps<AuthNavigatorParamList, "login">;

export function LoginScreen({ navigation }: Props) {
  const { loginContext, setUser } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.main}>
          {/* <Icon icon={"pin-pelops-menu"} style={styles.image} /> */}
          <PinOutline
            width={108}
            height={108}
            alignSelf="center"
            marginTop={47}
            color={color.white}
          />
          {/* <Text style={styles.header}>{translate("loginScreen.title")}</Text> */}
          <Text tx="loginScreen.title" />
          {/* <GIcon icon="arrow" color="primary" size="sm" /> */}
          {/* <Chat width={50} height={50} fill="#f00" /> */}
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
          <GButton onPress={() => setUser("dsada")} label="test" />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
