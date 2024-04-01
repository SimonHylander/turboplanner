import { Tabs } from "expo-router";

export default function SignInTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="sign-in" />
      <Tabs.Screen name="sign-up" />
    </Tabs>
  );
}
