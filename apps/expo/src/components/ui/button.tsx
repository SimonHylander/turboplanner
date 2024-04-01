import { Pressable } from "react-native";
import { Href, Link } from "expo-router";

const variantStyles = {
  default: "rounded-full w-full",
  primary:
    "border shadow p-6 bg-primary border-primary active:border-indigo-500 active:bg-indigo-500",
  secondary: "bg-secondary border-primary border shadow p-6",
  destructive:
    "bg-destructive border-primary border shadow hover:bg-destructive/90 text-white p-6",
  outline: "p-6",
  link: "underline",
  icon: "",
  loading: "bg-background text-background",
};

export default function AppButton({
  children,
  variant,
  href,
  className,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  variant:
    | "default"
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "link"
    | "icon"
    | "loading";
  href?: Href<string>;
  className?: string;
}) {
  const cls = `${variantStyles.default} ${variantStyles[variant]}`;

  if (variant === "link" && href) {
    return (
      <Link href={href} asChild>
        <Pressable onPress={onPress} className={`${cls} ${className}`}>
          {children}
        </Pressable>
      </Link>
    );
  }

  return (
    <Pressable onPress={onPress} className={`${cls} ${className}`}>
      {children}
    </Pressable>
  );
}
