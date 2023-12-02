import { NativeStackScreenProps } from "@react-navigation/native-stack";
import GForm from "components/GForm/GForm";
import { Validations } from "constants/Validations";
import AuthLayout from "layouts/AuthLayout";
import { AuthNavigatorParamList } from "navigators/AuthStack/AuthStack";
import { View, ViewStyle } from "react-native";
import { spacing } from "theme";
import * as Yup from "yup";

type Props = NativeStackScreenProps<AuthNavigatorParamList, "registration">;

type RegistrationValues = {
  email: string;
  name: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = Yup.object({
  email: Validations.emailRequired,
  name: Validations.name,
  lastName: Validations.name,
  password: Validations.password,
  confirmPassword: Validations.confirmPassword,
});

const initialValues: RegistrationValues = {
  email: "",
  name: "",
  lastName: "",
  password: "",
  confirmPassword: "",
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
          <GForm.TextInput valName="name" placeholderTx="registrationScreen.firstName" preset="thin" />
          <GForm.TextInput valName="lastName" placeholderTx="registrationScreen.lastName" preset="thin" />
          <GForm.TextInput valName="email" placeholderTx="loginScreen.email" preset="thin" />
          <GForm.TextInput valName="password" placeholderTx="loginScreen.password" secureTextEntry preset="thin" />
          <GForm.TextInput
            valName="confirmPassword"
            placeholderTx="registrationScreen.confirmPassword"
            secureTextEntry
            preset="thin"
          />
        </View>
        <GForm.SubmitButton tx="loginScreen.loginButton" style={submitButton} />
      </GForm>
    </AuthLayout>
  );
}

const submitButton = {
  alignSelf: "center",
  height: 45,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.sm,
} as ViewStyle;
