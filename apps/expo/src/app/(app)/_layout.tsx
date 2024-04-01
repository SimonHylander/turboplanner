// import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Redirect, Stack, Tabs } from "expo-router";

import "../../styles.css";

import { useSession } from "~/session/auth-context";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  /* if (isLoading) {
    return <Text>Loading...</Text>;
  }*/

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(sign-in)/sign-in" />;
  }

  //<GestureHandlerRootView style={{ flex: 1 }}></GestureHandlerRootView>

  return (
    <Tabs>
      <Tabs.Screen name="index" />
    </Tabs>
  );
}
