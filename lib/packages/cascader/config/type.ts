export type BaseType = string | number | boolean;
export interface Options {
  label: BaseType;
  value: BaseType;
  disabled?: boolean;
  children?: Options[];
}
