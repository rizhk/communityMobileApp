import { ThemeColorType } from "theme";

export type ModalProps = {
  visible: boolean;
  setVisible: (v: boolean) => void;
  color?: ThemeColorType;
};
