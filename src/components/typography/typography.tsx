import style from "./typography.module.css";

interface Text {
  children: any;
  variant?:
    | "displayLarge"
    | "displayMedium"
    | "displaySmall"
    | "headlineLarge"
    | "headlineMedium"
    | "headlineSmall"
    | "titleLarge"
    | "titleMedium"
    | "titleSmall"
    | "bodyLarge"
    | "bodyMedium"
    | "bodySmall"
    | "labelLarge"
    | "labelMedium"
    | "labelSmall";
  id?: string;
  testid?: string;
  className?: string;
  as?: "span" | "a" | "p";
  onClick?: (e: any) => void;
}

const Text = ({
  children,
  variant = "bodyMedium",
  testid,
  id,
  className = "",
  as = "p",
  ...params
}: Text) => {
  const TypographyComponent = `${as}` as keyof JSX.IntrinsicElements;
  return (
    <TypographyComponent
      {...params}
      data-testid={testid}
      id={id}
      className={`${style.typography} ${style[variant]} ${className}`}
    >
      {children}
    </TypographyComponent>
  );
};

export default Text;
