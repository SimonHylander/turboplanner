import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, Stack } from "expo-router";
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import z from "zod";

import { RegisterUserSchema } from "@acme/validators";

import Button from "~/components/ui/button";
import DismissKeyboard from "~/components/ui/dismiss-keyboard";
import Password from "~/components/ui/password";
import TextField from "~/components/ui/textfield";
import images from "~/images";
import { useSession } from "~/session/auth-context";
import { api } from "~/utils/api";
import { useZodForm } from "~/utils/form";

type FormData = z.infer<typeof RegisterUserSchema>;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default function SignUp() {
  const { session, signIn } = useSession();

  const utils = api.useUtils();

  const { mutate, error: mutationError } = api.auth.register.useMutation({
    onSuccess: (response) => {
      // check if trpc error

      if (response instanceof Error) {
        console.error(response);
        return;
      }

      console.log(response);
      signIn(response.token);
      router.replace("/(app)");
    },
    onError: (error) => {
      console.error(error);
    },
    //onSettled: () => utils.post.all.invalidate().then(),
  });

  const methods = useZodForm({
    schema: RegisterUserSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = methods;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    mutate(data);
  };

  const onError: SubmitErrorHandler<FormData> = (errors, e) => {
    return console.error(errors);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Stack.Screen options={{ title: "Sign Up" }} />

        <DismissKeyboard>
          <View className="flex h-full flex-col justify-between gap-4 bg-slate-950 p-8">
            <View className="flex flex-col items-center gap-4">
              <Image source={images.loginImage} style={styles.image} />

              <Text className="text-center text-3xl font-bold text-primary">
                Sign up
              </Text>

              <View className="flex w-full flex-col gap-4">
                {mutationError && (
                  <Text className="text-left text-destructive">
                    {mutationError.message}
                  </Text>
                )}

                <FormProvider {...methods}>
                  {/* <Text className="text-white">{JSON.stringify(errors)}</Text> */}

                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        variant="outline"
                        placeholder="Name"
                        onChangeText={onChange}
                        value={value}
                        className="w-full"
                      />
                    )}
                    name="name"
                  />
                  {errors.name && (
                    <Text className="px-4 text-left text-destructive">
                      This is required.
                    </Text>
                  )}

                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        variant="outline"
                        placeholder="Email"
                        onChangeText={onChange}
                        value={value}
                        className="w-full"
                      />
                    )}
                    name="email"
                  />
                  {errors.email && (
                    <Text className="px-4 text-left text-destructive">
                      This is required.
                    </Text>
                  )}

                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Password
                        variant="outline"
                        placeholder="Password"
                        onChangeText={onChange}
                        value={value}
                        className="w-full"
                      />
                    )}
                    name="password"
                  />
                  {errors.password && (
                    <Text className="px-4 text-left text-destructive">
                      This is required.
                    </Text>
                  )}

                  <Button
                    variant="primary"
                    className="w-full"
                    onPress={handleSubmit(onSubmit, onError)}
                  >
                    <Text className="text-center text-lg font-bold text-slate-950">
                      Sign up
                    </Text>
                  </Button>
                </FormProvider>
              </View>
            </View>

            <View className="flex flex-col items-center gap-2">
              <Text className="text-slate-700">Already have an account?</Text>

              <Button variant="link" href="/(sign-in)/sign-in">
                <Text className="text-center text-lg font-bold text-primary-foreground">
                  Sign in
                </Text>
              </Button>
            </View>
          </View>
        </DismissKeyboard>
      </ScrollView>
    </SafeAreaView>
  );
}
