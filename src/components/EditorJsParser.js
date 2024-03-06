import React from "react";
import { Text, View, Image } from "react-native";
import RenderHtml from "react-native-render-html";

const EditorJsParser = ({ content, contentWidth }) => {
  // if (!content) return null;

  const { blocks } = JSON.parse(content) || {};

  const renderBlock = (block) => {
    switch (block?.type) {
      case "header":
        return <Text style={{ fontSize: 5 * block.data.level }}>{block.data.text}</Text>;

      case "paragraph":
        return <RenderHtml contentWidth={contentWidth} source={{ html: block.data.text }} />;

      case "image":
        return (
          <Image style={{ width: "100%", height: 200 }} source={{ uri: block.data.file.url }} resizeMode="contain" />
        );

      default:
        return null;
    }
  };

  return (
    <View>
      {blocks &&
        blocks?.map((block) => (
          <View key={block.id} style={{ marginBottom: 20 }}>
            {renderBlock(block)}
          </View>
        ))}
    </View>
  );
};

export default EditorJsParser;
