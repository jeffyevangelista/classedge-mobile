import { CopilotProvider } from "react-native-copilot";

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <CopilotProvider
      //   tooltipComponent={CustomTooltip}
      //   stepNumberComponent={CustomStepNumber}
      overlay="svg"
      animated={true}
      backdropColor="rgba(0, 0, 0, 0.6)"
      labels={{
        skip: "Skip",
        previous: "Previous",
        next: "Next",
        finish: "Finish",
      }}
    >
      {children}
    </CopilotProvider>
  );
};
