import Tag from "./src/tag.vue";
import TagInput from "./src/tagInput.vue";

import { withInstall } from "../../utils";

const mTag = withInstall(Tag, "mTag");
const mTagInput = withInstall(TagInput, "mTagInput");

export { mTag, mTagInput };
