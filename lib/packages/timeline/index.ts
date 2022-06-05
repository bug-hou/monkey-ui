import Timeline from "./src/timeline.vue";
import TimelineItem from "./src/timelineItem.vue";

import { withInstall } from "../../utils";

const mTimeline = withInstall(Timeline, "mTimeline")
const mTimelineItem = withInstall(TimelineItem, "mTimelineItem")

export { mTimeline, mTimelineItem }
