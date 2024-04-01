import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, Tabs } from "expo-router";

import Button from "~/components/ui/button";
import DismissKeyboard from "~/components/ui/dismiss-keyboard";
import Password from "~/components/ui/password";
import TextField from "~/components/ui/textfield";
import images from "~/images";
import { useSession } from "~/session/auth-context";

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default function SignIn() {
  const { signIn } = useSession();

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: "Sign In" }} />

      <DismissKeyboard>
        <View className="flex h-full flex-col justify-between bg-slate-950 p-8">
          <View className="flex flex-col items-center gap-4">
            <Image source={images.loginImage} style={styles.image} />

            <Text className="text-center text-3xl font-bold text-primary">
              Sign in
            </Text>

            <View className="flex w-full flex-col items-center gap-4">
              <TextField
                variant="outline"
                placeholder="Email"
                className="w-full"
              />

              <Password variant="outline" placeholder="Password" />

              <Button
                variant="primary"
                className="w-full"
                onPress={() => console.log("Sign in")}
              >
                <Text className="text-center text-lg font-bold text-slate-950">
                  Sign in
                </Text>
              </Button>
            </View>
          </View>

          <View className="flex flex-col">
            <Button
              variant="link"
              href="/(sign-in)/sign-up"
              className="border border-primary p-6 shadow"
            >
              <Text className="text-center text-lg font-bold text-primary-foreground">
                Sign up with email
              </Text>
            </Button>
          </View>
        </View>
      </DismissKeyboard>
    </SafeAreaView>
  );
}
