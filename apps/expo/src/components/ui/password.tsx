import { useState } from "react";
import { TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const wrapperVariantStyles = {
  default: "rounded-full border-primary border w-auto py-6 pl-6 pr-12",
  primary: "bg-primary shadow hover:bg-primary/90",
  secondary: "bg-secondary shadow hover:bg-secondary/90",
  outline: "hover:bg-secondary/90",
};

const inputVariantStyles = {
  default: "text-white w-[95%]",
  primary: "",
  secondary: "",
  outline: "",
};

export default function Password({
  variant,
  placeholder,
  onChangeText,
  value,
  className,
}: {
  variant: "default" | "primary" | "secondary" | "outline";
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  className?: string;
}) {
  const wrapperStyle = `${wrapperVariantStyles.default} ${wrapperVariantStyles[variant]}`;
  const inputStyle = `${inputVariantStyles.default} ${inputVariantStyles[variant]}`;

  const [isVisible, setVisible] = useState(false);

  return (
    <View
      className={`flex w-full flex-row items-center justify-between gap-2 ${wrapperStyle} ${className}`}
    >
      <TextInput
        secureTextEntry={!isVisible}
        placeholder={placeholder}
        placeholderTextColor="#334155"
        onChangeText={onChangeText}
        value={value}
        className={inputStyle}
      />

      <Feather
        name={isVisible ? "eye-off" : "eye"}
        color="#818CF8"
        size={20}
        onPress={() => setVisible(!isVisible)}
      />
    </View>
  );
}
