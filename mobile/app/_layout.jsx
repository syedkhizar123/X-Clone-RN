import { ClerkProvider } from "@clerk/clerk-expo"
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { LogBox } from "react-native";
import { Stack } from "expo-router";
import "../global.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function RootLayout() {

  LogBox.ignoreLogs([
    "Text strings must be rendered within a <Text> component"
  ]);
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} ></Stack.Screen>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, name: "Home" }} ></Stack.Screen>
        </Stack>;
      </QueryClientProvider>
    </ClerkProvider>
  )
}
