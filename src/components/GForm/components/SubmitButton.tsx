import { ButtonProps, Button } from "components/Button";
import { useGForm } from "../GForm.props";

export default function SubmitButton({ onPress, ...props }: ButtonProps) {
  const { handleSubmit, themeColor } = useGForm();
  return <Button onPress={handleSubmit} color={themeColor} {...props} />;
}
