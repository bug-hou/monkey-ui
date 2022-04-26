export type Style =
  | "success"
  | "error"
  | "info"
  | "primary"
  | "warning"
  | "default";

export const Theme = {
  success: {
    color: "#67c23a",
    background: "rgb(240, 249, 235)",
    border: "#67c23a",
    hoverColor: "white",
    hoverBackground: "#67c23a"
  },
  info: {
    color: "#909399",
    background: "rgb(244, 244, 245)",
    border: "#909399",
    hoverColor: "white",
    hoverBackground: "#909399"
  },
  warning: {
    color: "#e6a23c",
    background: "rgb(253, 246, 236)",
    border: "#e6a23c",
    hoverColor: "white",
    hoverBackground: "#e6a23c"
  },
  primary: {
    color: "#409eff",
    background: "rgb(236, 245, 255)",
    border: "#409eff",
    hoverColor: "white",
    hoverBackground: "#409eff"
  },
  error: {
    color: "#f56c6c",
    background: "rgb(254, 240, 240)",
    border: "#f56c6c",
    hoverColor: "white",
    hoverBackground: "#f56c6c"
  },
  default: {
    color: "black",
    background: "white",
    border: "#dcdfe6",
    hoverColor: "#409eff",
    hoverBackground: "white"
  }
};
