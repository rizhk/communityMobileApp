import { ButtonProps, Button } from "components/Button";
import { useGForm } from "../GForm.props";

export default function SubmitButton({ onPress, ...props }: ButtonProps) {
  const { handleSubmit } = useGForm();
  return <Button onPress={handleSubmit} {...props} />;
}
