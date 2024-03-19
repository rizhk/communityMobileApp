import { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { InfoItem } from "types/info";
import { QuickImage } from "components/Images/QuickImage";

import { Text } from "components/Text";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import EditorJsParser from "components/EditorJsParser";

// Vous devrez adapter cette partie pour correspondre à la structure de vos données
const convertInfoToSections = (info: InfoItem) => [
  {
    title: info.title,
    contentRTE: info.contentRTE || null,
    cover: info.cover,
  },
];

type InfoCardProps = {
  info: InfoItem;
  navigation: NativeStackNavigationProp<MainStackParamList>; // Consider using a more specific type for navigation if possible
};

export const InfoCard = ({ navigation, info }: InfoCardProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const sections = convertInfoToSections(info);
  const { width } = useWindowDimensions();

  const _renderHeader = (section: any) => (
    <View>
      <Text size="lg" text={section.title} preset="bold" color="primary" />
    </View>
  );

  const _renderContent = (section: any) => (
    <View>
      {section.cover && (
        <QuickImage width={120} height={120} source={{ uri: section.cover.url }} style={{ borderRadius: 16 }} />
      )}

      {section?.contentRTE && <EditorJsParser content={section.contentRTE} />}
      {/* <Text size="lg" text={section.title} preset="bold" color="primary" /> */}
    </View>
  );

  return (
    // <View>
    //   <Text>asa</Text>
    // </View>
    <Accordion
      sections={sections}
      activeSections={activeSections}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
      onChange={setActiveSections}
      underlayColor="transparent"
    />
  );
};
