import { Ref } from "vue";

export interface Info {
  selection: number[];
  selectStatus: "select" | "has" | "none";
  options: any[];
  scroll: any;
  disableds: number;
  inputValue: string;
  height: number;
}
