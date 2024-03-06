import React, { useState } from "react";
import { View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { InfoItem } from "types/info";
import { QuickImage } from "components/ImageComponent";
import { createEditorJsViewer } from "editorjs-viewer-native";

// import { InfoData, InfoItem } from "types/info";
import { Text } from "components/Text";

import { TouchableOpacity } from "react-native";
import { is } from "ramda";

// Vous devrez adapter cette partie pour correspondre à la structure de vos données
const convertInfoToSections = (info: InfoItem) => [
  {
    title: info.title,
    content: info.contentRTE,
    cover: info.cover,
  },
];

export const InfoCard = ({ info }: { info: any }) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const sections = convertInfoToSections(info);
  const EditorJsViewerNative = createEditorJsViewer();

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

      <Text size="lg" text={section.title} preset="bold" color="primary" />
      {section.content && <EditorJsViewerNative data={JSON.parse(section.content)} />}
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
    />
  );
};
