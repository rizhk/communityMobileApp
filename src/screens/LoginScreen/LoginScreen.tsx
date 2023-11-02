import React from "react";
import { Text, SafeAreaView, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from "./styles";
import { color } from "theme";
import { AuthNavigatorParamList } from "../../navigators";
import { observer } from "mobx-react-lite";
import { AuthStrategy, PelopsScreen } from "types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "context/AuthContext";
import i18n from "i18n-js";
import Icon from "components/icon/Icon";

type Props = NativeStackScreenProps<AuthNavigatorParamList, "login">;
export const LoginScreen: PelopsScreen = observer(({ navigation }: Props) => {
  const { loginContext } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.main}>
          <Icon icon={"pin-pelops-menu"} style={styles.image} />
          <Text style={styles.header}>{i18n.t("loginScreen.title")}</Text>
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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
});
