import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { SessionProvider } from "~/session/auth-context";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <TRPCProvider>
      <StatusBar />

      <SessionProvider>
        {/* <Slot /> */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#818CF8",
            },
            contentStyle: {
              backgroundColor: "#020617",
            },
          }}
        >
          <Stack.Screen name="(app)" />
        </Stack>
      </SessionProvider>
    </TRPCProvider>
  );
}
/* export default function RootLayout() {
  return (
    <TRPCProvider>
      <StatusBar />

      <AuthProvider>
        <Slot />
      </AuthProvider>
    </TRPCProvider>
  );
}
 */
