import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack";

export default function ViewsTab() {
  return (
    <YStack bc="grey800" pa="sm" gap="xs" jc="space-between" flexGrow>
      <Text text="YStack bc='grey800' pa='sm' gap='xs' jc='space-between' flexGrow" />
      <XStack pa="xl" ai="center" alignSelf="center" maxWidth={250} gap="md">
        <YStack pa="xs" borderRadius="sm" borderWidth={2} borderColor="white" gap="sm">
          <YStack bc="primary" borderRadius="sm" pa="xs" />
          <YStack bc="secondary" borderRadius="sm" pa="xs" />
          <YStack bc="tertiary" borderRadius="sm" pa="xs" />
        </YStack>

        <XStack pa="xs" borderRadius="sm" borderWidth={2} borderColor="white" gap="sm">
          <YStack bc="primary" borderRadius="sm" pa="xs" />
          <YStack bc="secondary" borderRadius="sm" pa="xs" />
          <YStack bc="tertiary" borderRadius="sm" pa="xs" />
        </XStack>

        <Stack position="relative" maxWidth={50} width={100}>
          <Stack x={0} y={0} borderRadius="sm" pa="xs" borderColor="primary" borderWidth={2} full />
          <Stack x={10} y={10} borderRadius="sm" pa="xs" borderColor="secondary" borderWidth={2} full />
          <Stack x={20} y={20} borderRadius="sm" pa="xs" borderColor="tertiary" borderWidth={2} full />
        </Stack>
      </XStack>

      <XStack pa="xl" ai="stretch" alignSelf="center" maxWidth={250} height={150} gap="md" flex={1}>
        <Stack bc="primary" borderRadius="md" pa="xs" flexGrow shadow />
        <Stack bc="secondary" borderRadius="md" pa="xs" shadow />
        <Stack bc="tertiary" borderRadius="md" pa="xs" flexGrow shadow />
      </XStack>
      <Text text="test" />
      <XStack bc="secondary" h={50}>
        <Text text="test" />
      </XStack>
    </YStack>
  );
}
