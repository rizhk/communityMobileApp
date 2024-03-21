import {
  Accessibility,
  Contact,
  Contact2,
  Contact2Icon,
  LucideContact,
  Mail,
  Phone,
  PhoneCall,
} from "lucide-react-native";
import { PropsWithChildren } from "react";
import { View, ViewStyle, Linking } from "react-native";
//TODO: Use custom FloatingAction
import { FloatingAction } from "react-native-floating-action";

export function MainLayout({ children }: PropsWithChildren) {
  const actions = [
    {
      text: "Téléphone",
      icon: <Phone color="white" />,
      name: "bt_phone",
      position: 1,
    },
  ];

  return (
    <View style={page}>
      {children}
      <FloatingAction
        actions={actions}
        distanceToEdge={{ vertical: 80, horizontal: 12 }}
        floatingIcon={<PhoneCall color="white" />}
        buttonSize={48}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
          Linking.openURL("tel:0768048609");
        }}
      />
    </View>
  );
}

const page = {
  flexGrow: 1,
} as ViewStyle;
