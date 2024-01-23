import { Stack, YStack } from "components/containers";
import { StackProps } from "components/containers/Stack/Stack.props";
import { ScrollView } from "react-native";
import { ImagesSizeTypes, RadiusTypes, ThemeColorType } from "theme";
import Avatar, { AvatarProps } from "./Avatar";
import { Text } from "components/Text";

export type AvatarUser = {
  id: number;
  url: string;
  name?: string;
};

type AvatarSliderProps = {
  users: AvatarUser[];
  avatarProps?: AvatarProps;
};

function AvatarSlider(props: AvatarSliderProps) {
  const { users, avatarProps } = props;
  const { size = "lg", borderWidth = 3, color = "primary", borderRadius = "full", containerSx } = avatarProps || {};

  return (
    <Stack>
      <ScrollView horizontal contentContainerStyle={{ alignItems: "center" }} showsHorizontalScrollIndicator={false}>
        {users?.map((user: any, key: number) => (
          <YStack key={key} mr={10} ai="center">
            <Avatar
              url={user.url}
              color={color}
              size={size}
              borderWidth={borderWidth}
              borderRadius={borderRadius}
              containerSx={containerSx}
            />
            {user?.name && (
              <Text size="xxs" style={{ marginTop: 2 }}>
                {user.name.length > 10 ? `${user.name.slice(0, 8)}...` : user.name}
              </Text>
            )}
          </YStack>
        ))}
      </ScrollView>
    </Stack>
  );
}

export default AvatarSlider;
