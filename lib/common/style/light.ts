interface Theme {
  success: Colors;
  info: Colors;
  warning: Colors;
  primary: Colors;
  error: Colors;
  default: Colors;
}

interface Colors {
  color: string;
  backgroundColor: string;
  hoverColor: string;
  hoverBackgroundColor: string;
  borderColor: string;
}

export const LightTheme: Theme = {
  success: {
    color: "#67c23a",
    backgroundColor: "rgb(240, 249, 235)",
    hoverColor: "white",
    hoverBackgroundColor: "#67c23a",
    borderColor: "#67c23a"
  },
  info: {
    color: "#909399",
    backgroundColor: "rgb(244, 244, 245)",
    hoverColor: "white",
    hoverBackgroundColor: "#909399",
    borderColor: "#909399"
  },
  warning: {
    color: "#faaca8",
    backgroundColor: "rgb(253, 246, 236)",
    hoverColor: "white",
    hoverBackgroundColor: "#e6a23c",
    borderColor: "#faaca8"
  },
  primary: {
    color: "#409eff",
    backgroundColor: "rgb(236, 245, 255)",
    hoverColor: "white",
    hoverBackgroundColor: "#409eff",
    borderColor: "#409eff"
  },
  error: {
    color: "#f56c6c",
    backgroundColor: "rgb(254, 240, 240)",
    hoverColor: "white",
    hoverBackgroundColor: "#f56c6c",
    borderColor: "#f56c6c"
  },
  default: {
    color: "black",
    backgroundColor: "white",
    hoverColor: "#409eff",
    hoverBackgroundColor: "white",
    borderColor: "black"
  }
};
