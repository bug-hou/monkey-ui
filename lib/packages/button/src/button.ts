
export type ButtonType =
  | "success"
  | "error"
  | "info"
  | "primary"
  | "warning"
  | "default";

export type ButtonShape = "rect" | "round" | "arc" | "circle";

export type ButtonSize = "medium" | "small" | "mini";

export interface ButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  shape?: ButtonShape;
  plain?: boolean;
  size?: ButtonSize;
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
}

