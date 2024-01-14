import { Button } from "components/Button";
import { Text } from "components/Text";
import { TextProps } from "components/Text/text.props";
import { Stack } from "components/containers";
import { StackProps } from "components/containers/Stack/Stack.props";

export type BadgeProps = TextProps & {
  containerProps: StackProps;
};

export default function Badge(props: BadgeProps) {
  const { containerProps, ...rest } = props;

  return (
    <Button
  );
}
