export type BaseType = string | number | boolean;
export interface Options {
  label: BaseType;
  value: BaseType;
  disabled?: boolean;
  children?: Options[];
}

export type TagType = "success"
  | "error"
  | "info"
  | "primary"
  | "warning"
  | "default";

export type Rule = "all" | "parent" | "child";
