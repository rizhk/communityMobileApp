import { View, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "context/AuthContext";
import { AuthNavigatorParamList } from "navigators/AuthStack/AuthStack";
import { Button } from "components/Button";
import GForm from "components/GForm/GForm";
import * as Yup from "yup";
import { Validations } from "constants/Validations";
import { color, spacing } from "theme";
import AuthLayout from "layouts/AuthLayout";
import { AuthStrategy } from "types";

type Props = NativeStackScreenProps<AuthNavigatorParamList, "registration">;

type RegistrationValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Validations.emailRequired,
  password: Validations.password,
});

const initialValues: RegistrationValues = {
  email: "",
  password: "",
};

export default function RegistrationScreen(props: Props) {
  const handleSubmit = (values: RegistrationValues) => {};

  return (
    <AuthLayout title="registrationScreen.title">
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
    </AuthLayout>
  );
}

const inputContainer = {
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.sm,
} as ViewStyle;

const inputStyle = {
  height: 35,
  backgroundColor: color.grey800,
  width: "100%",
} as ViewStyle;

const submitButton = {
  alignSelf: "center",
  height: 45,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.sm,
} as ViewStyle;
