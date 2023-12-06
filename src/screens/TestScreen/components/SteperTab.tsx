import PSteps from "components/Steper";
import Steper from "components/Steper";
import { YStack } from "components/containers/Stack";
import { Text, View } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { PSteps as PPSteps, PStep } from "components/PSteps/PSteps";
export default function SteperTab() {
  return (
    //   <Steper />

    <>
      <PPSteps>
        <PStep label="First Step">
          <Text>This is the content within step 1!</Text>
        </PStep>
        <PStep label="Second Step">
          <Text>This is the content within step 2!</Text>
        </PStep>
        <PStep label="third Step">
          <Text>This is the content within step 2!</Text>
        </PStep>
        <PStep label="fourth Step">
          <Text>This is the content within step 2!</Text>
        </PStep>
      </PPSteps>
      {/* <PSteps>
        <ProgressStep label="First Step">
          <View style={{ alignItems: "center" }}>
            <Text>This is the content within step 1!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Second Step">
          <View style={{ alignItems: "center" }}>
            <Text>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Third Step">
          <View style={{ alignItems: "center" }}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Third Step">
          <View style={{ alignItems: "center" }}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Third Step">
          <View style={{ alignItems: "center" }}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
      </PSteps> */}
    </>
  );
}
