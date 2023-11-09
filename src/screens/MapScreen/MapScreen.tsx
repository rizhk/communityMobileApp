import { PinOutline } from "assets/svg";
import { Button } from "components/Button";
import { Modal } from "components/Modal";
import { Text } from "components/Text";
import { MainLayout } from "layout";
import { useState } from "react";

export default function MapScreen() {
  const [open, setOpen] = useState(false);
  return (
    <MainLayout>
      <Text>MapScreen</Text>
      <Button
        text="test"
        icon={PinOutline}
        onPress={() => setOpen(true)}
        style={{ width: 150, alignSelf: "center" }}
      />
      <Modal visible={open} setVisible={setOpen}>
        <Text text="TEST" />
      </Modal>
    </MainLayout>
  );
}
