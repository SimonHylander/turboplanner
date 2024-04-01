import { TextInput } from "react-native";

const variantStyles = {
  default: "rounded-full border-primary border p-6 w-auto text-white",
  primary: "bg-primary  shadow hover:bg-primary/90",
  secondary: "bg-secondary shadow hover:bg-secondary/90",
  outline: "hover:bg-secondary/90",
};

export default function TextField({
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
  const cls = `${variantStyles.default} ${variantStyles[variant]}`;

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#334155"
      onChangeText={onChangeText}
      value={value}
      className={`${cls} ${className}`}
    />
  );
}
