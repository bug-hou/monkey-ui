import gradient from "./src/gradient.vue";
import { withInstall } from "../../utils/index"

gradient.name = "mGradient";
const mGradient = withInstall(gradient);

export { mGradient }
